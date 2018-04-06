import { AlertController, NavController, Platform } from 'ionic-angular';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { ExhibitDataService } from '../../data/exhibit.data.service';
import { slideInOutAnimation } from './animations';
import { Artifact, Exhibit, Room } from '../../data/model/exhibit';

@Component({
    selector: 'new-audio-tour-page',
    templateUrl: 'new.audio.tour.page.html',
    animations: [slideInOutAnimation]
})
export class NewAudioTourPage implements OnDestroy {

    exhibit: Exhibit;

    currentExhibit: Exhibit;
    currentRoom: Room;
    currentArtifact: Artifact;

    currentClipIndex: number;
    totalClips: number;

    allowExit: boolean = false;
    showIntro: boolean = true;

    slideState: string;

    private _autoPlayNext: boolean = true;

    private _pauseSubscription: any;
    private _resumeSubscription: any;

    constructor(public exhibitDataService: ExhibitDataService, platform: Platform,
                public alertCtrl: AlertController, public navCtrl: NavController, public cdRef: ChangeDetectorRef) {

        this.exhibit = exhibitDataService.getExhibitData();

        this.currentClipIndex = -1;
        this.totalClips = 1;  //start with 1 for exhibit clip

        this.exhibit.rooms.forEach((room: Room) => {
            this.totalClips++; //about room clip

            room.artifacts.forEach(() => {
                this.totalClips++;
            });
        });

        platform.ready().then(() => {
            this._pauseSubscription = platform.pause.subscribe(() => {
                console.log('PLATFORM PAUSE - AUDIO TOUR PAGE');
                this._autoPlayNext = false;
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

    private _setDisplayItemByIndex(index: number): void {
        if (index === 0) {
            this._setContextExhibit(this.exhibit);
            return;
        }

        let currentDisplayIndex = 0;

        this.exhibit.rooms.forEach((room: Room) => {
            currentDisplayIndex++;

            if (currentDisplayIndex === index) {
                this._setContextRoom(room);
                return;
            }

            room.artifacts.forEach((artifact: Artifact) => {
                currentDisplayIndex++;

                if (currentDisplayIndex === index) {
                    this._setContextArtifact(artifact, room);
                    return;
                }
            });
        });
    }

    private _setContextExhibit(exhibit: Exhibit): void {
        this.currentExhibit = exhibit;
        this.currentRoom = null;
        this.currentArtifact = null;
    }

    private _setContextRoom(room: Room): void {
        this.currentExhibit = null;
        this.currentRoom = room;
        this.currentArtifact = null;
    }

    private _setContextArtifact(artifact: Artifact, room: Room): void {
        this.currentExhibit = null;
        this.currentRoom = room;
        this.currentArtifact = artifact;
    }
}
