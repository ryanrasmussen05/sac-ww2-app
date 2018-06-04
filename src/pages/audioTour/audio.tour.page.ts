import { AlertController, NavController, Platform } from 'ionic-angular';
import { ChangeDetectorRef, Component, NgZone, OnDestroy } from '@angular/core';
import { ExhibitDataService } from '../../data/exhibit.data.service';
import { audioTourSlideInOutAnimation } from './audio.tour.animation';
import { Artifact, Exhibit, Room } from '../../data/model/exhibit';
import { Media, MEDIA_ERROR, MEDIA_STATUS, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';

@Component({
    selector: 'audio-tour-page',
    templateUrl: 'audio.tour.page.html',
    animations: [audioTourSlideInOutAnimation]
})
export class AudioTourPage implements OnDestroy {

    exhibit: Exhibit;

    currentItems: any[] = []; //use this array to more easily allow animations

    currentClipIndex: number;
    totalClips: number;

    allowExit: boolean = false;
    showIntro: boolean = true;

    slideState: string;

    private _currentAudioFile: MediaObject;
    private _status: MEDIA_STATUS;
    private _autoPlayNext: boolean = true;

    private _pauseSubscription: any;
    private _resumeSubscription: any;
    private _statusSubscription: any;
    private _successSubscription: any;
    private _errorSubscription: any;

    constructor(public exhibitDataService: ExhibitDataService, public platform: Platform, public file: File, public media: Media,
                public alertCtrl: AlertController, public navCtrl: NavController, public cdRef: ChangeDetectorRef, private ngZone: NgZone) {

        this.exhibit = exhibitDataService.getExhibitData();

        this.currentClipIndex = -1;
        this.totalClips = 1;  //start with 1 for exhibit clip

        this.exhibit.rooms.forEach((room: Room) => {
            if (room.audio) {
                this.totalClips++; //about room clip
            }

            room.artifacts.forEach(() => {
                this.totalClips++;
            });
        });

        platform.ready().then(() => {
            this._pauseSubscription = platform.pause.subscribe(() => {
                console.log('PLATFORM PAUSE - AUDIO TOUR PAGE');

                this._autoPlayNext = false;

                //pause audio if playing (ios handles this automatically)
                if (!!this._currentAudioFile && this.isPlaying() && this.platform.is('android')) {
                    this._currentAudioFile.pause();
                }
            });

            this._resumeSubscription = platform.resume.subscribe(() => {
                console.log('PLATFORM RESUME - AUDIO TOUR PAGE');

                this._autoPlayNext = true;
            });
        });
    }

    ngOnDestroy(): void {
        this._pauseSubscription.unsubscribe();
        this._resumeSubscription.unsubscribe();

        if (!!this._statusSubscription) {
            this._statusSubscription.unsubscribe();
        }

        if (!!this._successSubscription) {
            this._successSubscription.unsubscribe();
        }

        if (!!this._errorSubscription) {
            this._errorSubscription.unsubscribe();
        }

        if (!!this._currentAudioFile) {
            this._currentAudioFile.release();
        }
    }

    setCardClasses(item: any): any[] {
        let classes: any = {
            'exhibit': this.isExhibit(item),
            'room': this.isRoom(item),
            'artifact': this.isArtifact(item)
        };

        if (this.isRoom(item)) {
            classes['room-' + item.color] = true;
        }

        return classes;
    }

    ionViewCanLeave(): boolean {
        if (this.hasNextClip() && !this.allowExit) {

            const leaveAlert = this.alertCtrl.create({
                title: 'Exit the Audio Tour?',
                message: 'Audio Tour is still in progress. Are you sure you want to leave?',
                buttons: [
                    {
                        text: 'Leave',
                        handler: () => {
                            this.allowExit = true;
                            this.navCtrl.pop();
                        }
                    },
                    {
                        text: 'Stay'
                    }
                ]
            });

            leaveAlert.present();

            return false;
        } else {
            return true;
        }
    }

    beginTour(): void {
        this.showIntro = false;
        this.nextClip();
    }

    playPause(): void {
        if (!!this._currentAudioFile) {
            if (this.isPlaying()) {
                this._currentAudioFile.pause();
            } else {
                this._currentAudioFile.play();
            }
        }
    }

    hasNextClip(): boolean {
        return this.currentClipIndex < this.totalClips - 1;
    }

    hasPreviousClip(): boolean {
        return this.currentClipIndex > 0;
    }

    nextClip(): void {
        this.slideState = 'next';
        this.cdRef.detectChanges(); //immediately change animation state

        this.currentClipIndex++;

        this._setDisplayItemByIndex(this.currentClipIndex);
    }

    previousClip(): void {
        this.slideState = 'previous';
        this.cdRef.detectChanges();

        this.currentClipIndex--;

        this._setDisplayItemByIndex(this.currentClipIndex);
    }

    isPlaying(): boolean {
        return this._status === MEDIA_STATUS.RUNNING;
    }

    isExhibit(item: any): item is Exhibit {
        return (<Exhibit>item).rooms !== undefined;
    }

    isRoom(item: any): item is Room {
        return(<Room>item).artifacts !== undefined;
    }

    isArtifact(item: any): item is Artifact {
        return(<Artifact>item).pictures !== undefined;
    }

    private _setDisplayItemByIndex(index: number): void {
        if (index === 0) {
            this._setContextItem(this.exhibit);
            return;
        }

        let currentDisplayIndex = 0;

        this.exhibit.rooms.forEach((room: Room) => {
            if (room.audio) {
                currentDisplayIndex++;

                if (currentDisplayIndex === index) {
                    this._setContextItem(room);
                    return;
                }
            }

            room.artifacts.forEach((artifact: Artifact) => {
                currentDisplayIndex++;

                if (currentDisplayIndex === index) {
                    this._setContextItem(artifact);
                    return;
                }
            });
        });
    }

    private _setContextItem(item: Exhibit | Room | Artifact): void {
        this.currentItems.push(item);
        this.cdRef.detectChanges();
        this._removePreviousItem();
        this._loadAudioFile(item.audio);
    }

    private _removePreviousItem(): void {
        if (this.currentItems.length > 1) {
            this.currentItems.splice(0, 1);
        }
    }

    private _loadAudioFile(fileName: string): void {

        this.platform.ready().then(() => {

            if (!!this._statusSubscription) {
                this._statusSubscription.unsubscribe();
                this._statusSubscription = null;
            }

            if (!!this._successSubscription) {
                this._successSubscription.unsubscribe();
                this._successSubscription = null;
            }

            if (!!this._errorSubscription) {
                this._errorSubscription.unsubscribe();
                this._errorSubscription = null;
            }

            if (!!this._currentAudioFile) {
                this._currentAudioFile.release();
                this._currentAudioFile = null;
            }

            let path;

            if (this.platform.is('android')) {
                path = this.file.applicationDirectory + 'www/assets/audio/' + fileName;
            } else if (this.platform.is('ios')) {
                path = 'cdvfile://localhost/bundle/www/assets/audio/' + fileName;
            }

            if (this.platform.is('cordova')) {
                this._currentAudioFile = this.media.create(path);
                this._statusSubscription = this._currentAudioFile.onStatusUpdate.subscribe((status: MEDIA_STATUS) => this._onStatusUpdate(status));
                this._successSubscription = this._currentAudioFile.onSuccess.subscribe(() => this._onSuccess());
                this._errorSubscription = this._currentAudioFile.onError.subscribe((error: MEDIA_ERROR) => this._onError(error));

                if (this._autoPlayNext) {
                    this._currentAudioFile.play();
                }
            }
        });
    }

    private _onSuccess(): void {
        this.ngZone.run(() => {
            console.log('TRACK FINISHED');

            if (this.hasNextClip() && this._autoPlayNext) {
                this.nextClip();
            } else {
                const completedAlert = this.alertCtrl.create({
                    title: 'Audio Tour Completed',
                    subTitle: 'You have reached the end of the audio tour.',
                    buttons: ['OK']
                });

                completedAlert.present();
            }
        });
    }

    private _onStatusUpdate(status: MEDIA_STATUS) {
        this.ngZone.run(() => {
            console.log('MEDIA STATUS', status);
            this._status = status;
        });
    }

    private _onError(error: MEDIA_ERROR): void {
        this.ngZone.run(() => {
            console.error('Media Error: ', error);
        });
    }
}
