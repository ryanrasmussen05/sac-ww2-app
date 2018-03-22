import { AlertController, Content, NavController, Platform, Slides } from 'ionic-angular';
import { ChangeDetectorRef, Component, OnDestroy, ViewChild } from '@angular/core';
import { AudioProvider, AudioTrackComponent, ITrackConstraint } from 'ionic-audio';
import { ExhibitDataService } from '../../data/exhibit.data.service';
import { Artifact, Room } from '../../data/model/room';
import { slideInOutAnimation } from './animations';

@Component({
    selector: 'audio-tour-page',
    templateUrl: 'audio.tour.page.html',
    animations: [slideInOutAnimation]
})
export class AudioTourPage implements OnDestroy {
    @ViewChild('content') content: Content;
    @ViewChild('slider') slider: Slides;
    @ViewChild('audioTrack') audioTrack: AudioTrackComponent;

    rooms: Room[];

    currentRoom: Room;
    currentArtifacts: Artifact[] = []; //use this array to more easily allow animations

    get currentArtifact(): Artifact {
        return this.currentArtifacts[0];
    }

    currentPictureIndex: number;

    currentTrack: ITrackConstraint;

    artifactIndex: number;
    totalArtifacts: number;

    allowExit: boolean = false;

    slideState: string = 'next';

    private _autoPlayNext: boolean = true;
    private _pauseSubscription: any;
    private _resumeSubscription: any;

    constructor(public exhibitDataService: ExhibitDataService, public audioProvider: AudioProvider, platform: Platform,
                public alertCtrl: AlertController, public navCtrl: NavController, public cdRef: ChangeDetectorRef) {
        this.rooms = exhibitDataService.getExhibitData();

        this.currentRoom = this.rooms[0];
        this.setCurrentArtifact(this.currentRoom.artifacts[0]);

        this.artifactIndex = 0;
        this.totalArtifacts = 0;

        this.currentPictureIndex = 0;

        this.rooms.forEach((room: Room) => {
            room.artifacts.forEach(() => {
                this.totalArtifacts++;
            });
        });

        platform.ready().then(() => {
            this._pauseSubscription = platform.pause.subscribe(() => {
                console.log('PLATFORM PAUSE - AUDIO TOUR PAGE');
                this._autoPlayNext = false;
                this.audioProvider.stop();
            });

            this._resumeSubscription = platform.resume.subscribe(() => {
                console.log('PLATFORM RESUME - AUDIO TOUR PAGE');
                this._autoPlayNext = true;
            });
        });
    }

    setCurrentArtifact(artifact: Artifact): void {
        this.currentArtifacts = [artifact];
    }

    ngOnDestroy(): void {
        this.audioProvider.stop();
        this.audioProvider.tracks.length = 0;

        this._pauseSubscription.unsubscribe();
        this._resumeSubscription.unsubscribe();
    }

    ngAfterViewInit(): void {
        this._loadAudioTrack();
    }

    ionViewCanLeave(): boolean {
        if (this.hasNextArtifact() && !this.allowExit) {

            const leaveAlert = this.alertCtrl.create({
                title: 'Exit the Audio Tour?',
                message: 'Audio Tour is still in progress. Are you sure you want to leave?',
                buttons: [
                    {
                        text: 'Leave',
                        handler: () => {
                            this.allowExit = true;
                            this.navCtrl.popToRoot();
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

    hasNextArtifact(): boolean {
        return this.artifactIndex < this.totalArtifacts - 1;
    }

    hasPreviousArtifact(): boolean {
        return this.artifactIndex > 0;
    }

    nextArtifact(): void {
        this.slideState = 'next';
        this.cdRef.detectChanges(); //immediately change animation state

        this.artifactIndex++;

        const artifactIndexInExhibit = this.currentRoom.artifacts.indexOf(this.currentArtifact);

        if (artifactIndexInExhibit < this.currentRoom.artifacts.length - 1) {
            this.setCurrentArtifact(this.currentRoom.artifacts[artifactIndexInExhibit + 1]);
        } else {
            this.currentRoom = this._getNextViewableExhibit();
            this.setCurrentArtifact(this.currentRoom.artifacts[0]);
        }

        this.currentPictureIndex = 0;

        this._loadAudioTrack();

        setTimeout(() => {
            this.content.resize();
        });
    }

    previousArtifact(): void {
        this.slideState = 'previous';
        this.cdRef.detectChanges();

        this.artifactIndex--;

        const artifactIndexInExhibit = this.currentRoom.artifacts.indexOf(this.currentArtifact);

        if (artifactIndexInExhibit > 0) {
            this.setCurrentArtifact(this.currentRoom.artifacts[artifactIndexInExhibit - 1]);
        } else {
            this.currentRoom = this._getPreviousViewableRoom();
            this.setCurrentArtifact(this.currentRoom.artifacts[this.currentRoom.artifacts.length - 1]);
        }

        this.currentPictureIndex = 0;

        this._loadAudioTrack();

        setTimeout(() => {
            this.content.resize();
        });
    }

    onSlideChanged() {
        this.currentPictureIndex = this.slider.getActiveIndex();
    }

    nextSlide() {
        this.slider.slideNext();
    }

    previousSlide() {
        this.slider.slidePrev();
    }

    trackFinished() {
        console.log('TRACK FINISHED');

        // if app is paused
        if (!this._autoPlayNext) {
            return;
        }

        if (this.hasNextArtifact()) {
            setTimeout(() => { //do this to prevent change after check error
                this.nextArtifact();
            });
        } else {
            const completedAlert = this.alertCtrl.create({
                title: 'Audio Tour Completed',
                subTitle: 'You have reached the end of the audio tour.',
                buttons: ['OK']
            });

            completedAlert.present();
        }
    }

    private _getNextViewableExhibit(): Room {
        let currentRoomIndex = this.rooms.indexOf(this.currentRoom);
        currentRoomIndex++;

        let nextRoom: Room = null;

        while (currentRoomIndex <= this.rooms.length - 1) {
            if (this.rooms[currentRoomIndex].artifacts.length > 0) {
                nextRoom = this.rooms[currentRoomIndex];
                break;
            } else {
                currentRoomIndex++;
            }
        }

        return nextRoom;
    }

    private _getPreviousViewableRoom(): Room {
        let currentRoomIndex = this.rooms.indexOf(this.currentRoom);
        currentRoomIndex--;

        let previousRoom: Room = null;

        while (currentRoomIndex >= 0) {
            if (this.rooms[currentRoomIndex].artifacts.length > 0) {
                previousRoom = this.rooms[currentRoomIndex];
                break;
            } else {
                currentRoomIndex--;
            }
        }

        return previousRoom;
    }

    private _loadAudioTrack(): void {
        this.currentTrack = {
            src: 'assets/audio/' + this.currentArtifact.audio,
            preload: 'metadata'
        };

        //wait for track to load
        setTimeout(() => {
            this.audioTrack.play()
        }, 1000);
    }
}
