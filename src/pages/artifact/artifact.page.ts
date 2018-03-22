import { Component, OnDestroy, ViewChild } from '@angular/core';
import { NavParams, Platform, Slides } from 'ionic-angular';
import { AudioProvider, ITrackConstraint } from 'ionic-audio';
import { Artifact, Room } from '../../data/model/room';


@Component({
    selector: 'artifact-page',
    templateUrl: 'artifact.page.html'
})
export class ArtifactPage implements OnDestroy {
    @ViewChild('slider') slider: Slides;

    room: Room;
    artifact: Artifact;
    track: ITrackConstraint;

    currentIndex = 0;

    private _pauseSubscription: any;

    constructor(public navParams: NavParams, public audioProvider: AudioProvider, platform: Platform) {
        this.room = navParams.get('room');
        this.artifact = navParams.get('artifact');

        this.track = {
            src: 'assets/audio/' + this.artifact.audio,
            preload: 'metadata'
        };

        platform.ready().then(() => {
            this._pauseSubscription = platform.pause.subscribe(() => {
                console.log('PLATFORM PAUSE - ARTIFACT PAGE');
                this.audioProvider.stop();
            });
        });
    }

    ngOnDestroy(): void {
        this.audioProvider.stop();
        this.audioProvider.tracks.length = 0;

        this._pauseSubscription.unsubscribe();
    }

    onSlideChanged() {
        this.currentIndex = this.slider.getActiveIndex();
    }

    nextSlide() {
        this.slider.slideNext();
    }

    previousSlide() {
        this.slider.slidePrev();
    }
}
