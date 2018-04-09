import { Component, ViewChild } from '@angular/core';
import { NavParams, Slides } from 'ionic-angular';
import { Artifact, Room } from '../../data/model/exhibit';

@Component({
    selector: 'artifact-page',
    templateUrl: 'artifact.page.html'
})
export class ArtifactPage {
    @ViewChild('slider') slider: Slides;

    room: Room;
    artifact: Artifact;

    currentIndex = 0;

    constructor(public navParams: NavParams) {
        this.room = Object.create(navParams.get('room'));
        this.artifact = Object.create(navParams.get('artifact'));
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

    hasNextArtifact(): boolean {
        return this._getCurrentIndex() < this.room.artifacts.length - 1;
    }

    hasPreviousArtifact(): boolean {
        return this._getCurrentIndex() > 0;
    }

    nextArtifact(): void {
        this.artifact = this.room.artifacts[this._getCurrentIndex() + 1];
        this.slider.slideTo(0, 0, false);
        this.currentIndex = 0;
    }

    previousArtifact(): void {
        this.artifact = this.room.artifacts[this._getCurrentIndex() - 1];
        this.slider.slideTo(0, 0, false);
        this.currentIndex = 0;
    }

    private _getCurrentIndex(): number {
        return this.room.artifacts.findIndex((artifact) => {
            return artifact.name === this.artifact.name;
        });
    }
}
