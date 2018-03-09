import { Component, OnDestroy, ViewChild } from '@angular/core';
import { NavParams, Slides } from 'ionic-angular';
import { AudioProvider, ITrackConstraint } from 'ionic-audio';
import { Artifact, Exhibit } from '../../data/model/exhibit';


@Component({
    selector: 'artifact-page',
    templateUrl: 'artifact.page.html'
})
export class ArtifactPage implements OnDestroy {
    @ViewChild('slider') slider: Slides;

    exhibit: Exhibit;
    artifact: Artifact;
    track: ITrackConstraint;

    currentIndex = 0;

    constructor(public navParams: NavParams, public audioProvider: AudioProvider) {
        this.exhibit = navParams.get('exhibit');
        this.artifact = navParams.get('artifact');

        this.track = {
            src: 'assets/audio/sample.mp3',
            preload: 'metadata'
        };
    }

    ngOnDestroy(): void {
        this.audioProvider.stop();
        this.audioProvider.tracks.length = 0;
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
