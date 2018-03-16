import { AlertController, App, Content, NavController, Slides } from 'ionic-angular';
import { Component, OnDestroy, ViewChild } from '@angular/core';
import { AudioProvider, AudioTrackComponent, ITrackConstraint } from 'ionic-audio';
import { ExhibitDataService } from '../../data/exhibit.data.service';
import { Artifact, Room } from '../../data/model/room';

@Component({
    selector: 'audio-tour-page',
    templateUrl: 'audio.tour.page.html'
})
export class AudioTourPage implements OnDestroy {
    @ViewChild('content') content: Content;
    @ViewChild('slider') slider: Slides;
    @ViewChild('audioTrack') audioTrack: AudioTrackComponent;

    rooms: Room[];

    currentRoom: Room;
    currentArtifact: Artifact;

    currentPictureIndex: number;

    currentTrack: ITrackConstraint;

    artifactIndex: number;
    totalArtifacts: number;

    allowExit: boolean = false;

    constructor(public exhibitDataService: ExhibitDataService, public audioProvider: AudioProvider,
                public alertCtrl: AlertController, public navCtrl: NavController, public app: App) {
        this.rooms = exhibitDataService.getExhibitData();

        this.currentRoom = this.rooms[0];
        this.currentArtifact = this.currentRoom.artifacts[0];

        this.artifactIndex = 0;
        this.totalArtifacts = 0;

        this.currentPictureIndex = 0;

        this.rooms.forEach((room: Room) => {
            room.artifacts.forEach(() => {
                this.totalArtifacts++;
            });
        });
    }

    ngOnDestroy(): void {
        this.audioProvider.stop();
        this.audioProvider.tracks.length = 0;
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
        this.artifactIndex++;

        const artifactIndexInExhibit = this.currentRoom.artifacts.indexOf(this.currentArtifact);

        if (artifactIndexInExhibit < this.currentRoom.artifacts.length - 1) {
            this.currentArtifact = this.currentRoom.artifacts[artifactIndexInExhibit + 1];
        } else {
            this.currentRoom = this._getNextViewableExhibit();
            this.currentArtifact = this.currentRoom.artifacts[0];
        }

        this.currentPictureIndex = 0;
        this.slider.update();
        this.slider.slideTo(0, 0, false);
        this.content.scrollToTop(0);

        this._loadAudioTrack();
    }

    previousArtifact(): void {
        this.artifactIndex--;

        const artifactIndexInExhibit = this.currentRoom.artifacts.indexOf(this.currentArtifact);

        if (artifactIndexInExhibit > 0) {
            this.currentArtifact = this.currentRoom.artifacts[artifactIndexInExhibit - 1];
        } else {
            this.currentRoom = this._getPreviousViewableRoom();
            this.currentArtifact = this.currentRoom.artifacts[this.currentRoom.artifacts.length - 1];
        }

        this.currentPictureIndex = 0;
        this.slider.update();
        this.slider.slideTo(0, 0, false);
        this.content.scrollToTop(0);

        this._loadAudioTrack();
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
        });
    }
}
