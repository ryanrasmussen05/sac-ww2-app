import { Component, ViewChild } from '@angular/core';
import { NavParams, Slides } from 'ionic-angular';
import { Artifact, Exhibit } from '../../data/model/exhibit';


@Component({
    selector: 'artifact-page',
    templateUrl: 'artifact.page.html'
})
export class ArtifactPage {
    @ViewChild('slider') slider: Slides;

    exhibit: Exhibit;
    artifact: Artifact;

    currentIndex = 0;

    constructor(public navParams: NavParams) {
        this.exhibit = navParams.get('exhibit');
        this.artifact = navParams.get('artifact');
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
