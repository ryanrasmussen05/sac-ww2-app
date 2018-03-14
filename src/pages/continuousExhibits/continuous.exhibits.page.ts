import { Content, Slides } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { ExhibitDataService } from '../../data/exhibit.data.service';
import { Artifact, Exhibit } from '../../data/model/exhibit';

@Component({
    selector: 'continuous-exhibits-page',
    templateUrl: 'continuous.exhibits.page.html'
})
export class ContinuousExhibitsPage {
    @ViewChild('content') content: Content;
    @ViewChild('slider') slider: Slides;

    exhibits: Exhibit[];

    currentExhibit: Exhibit;
    currentArtifact: Artifact;

    currentPictureIndex: number;

    artifactIndex: number;
    totalArtifacts: number;

    constructor(public exhibitDataService: ExhibitDataService) {
        this.exhibits = exhibitDataService.getExhibitData();

        this.currentExhibit = this.exhibits[0];
        this.currentArtifact = this.currentExhibit.artifacts[0];

        this.artifactIndex = 0;
        this.totalArtifacts = 0;

        this.currentPictureIndex = 0;

        this.exhibits.forEach((exhibit: Exhibit) => {
            exhibit.artifacts.forEach(() => {
                this.totalArtifacts++;
            });
        })
    }

    hasNextArtifact(): boolean {
        return this.artifactIndex < this.totalArtifacts - 1;
    }

    hasPreviousArtifact(): boolean {
        return this.artifactIndex > 0;
    }

    nextArtifact(): void {
        this.artifactIndex++;

        const artifactIndexInExhibit = this.currentExhibit.artifacts.indexOf(this.currentArtifact);

        if (artifactIndexInExhibit < this.currentExhibit.artifacts.length - 1) {
            this.currentArtifact = this.currentExhibit.artifacts[artifactIndexInExhibit + 1];
        } else {
            this.currentExhibit = this._getNextViewableExhibit();
            this.currentArtifact = this.currentExhibit.artifacts[0];
        }

        this.currentPictureIndex = 0;
        this.slider.update();
        this.slider.slideTo(0, 0, false);
        this.content.scrollToTop(0);
    }

    previousArtifact(): void {
        this.artifactIndex--;

        const artifactIndexInExhibit = this.currentExhibit.artifacts.indexOf(this.currentArtifact);

        if (artifactIndexInExhibit > 0) {
            this.currentArtifact = this.currentExhibit.artifacts[artifactIndexInExhibit - 1];
        } else {
            this.currentExhibit = this._getPreviousViewableExhibit();
            this.currentArtifact = this.currentExhibit.artifacts[this.currentExhibit.artifacts.length - 1];
        }

        this.currentPictureIndex = 0;
        this.slider.update();
        this.slider.slideTo(0, 0, false);
        this.content.scrollToTop(0);
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

    private _getNextViewableExhibit(): Exhibit {
        let currentExhibitIndex = this.exhibits.indexOf(this.currentExhibit);
        currentExhibitIndex++;

        let nextExhibit: Exhibit = null;

        while (currentExhibitIndex <= this.exhibits.length - 1) {
            if (this.exhibits[currentExhibitIndex].artifacts.length > 0) {
                nextExhibit = this.exhibits[currentExhibitIndex];
                break;
            } else {
                currentExhibitIndex++;
            }
        }

        return nextExhibit;
    }

    private _getPreviousViewableExhibit(): Exhibit {
        let currentExhibitIndex = this.exhibits.indexOf(this.currentExhibit);
        currentExhibitIndex--;

        let previousExhibit: Exhibit = null;

        while (currentExhibitIndex >= 0) {
            if (this.exhibits[currentExhibitIndex].artifacts.length > 0) {
                previousExhibit = this.exhibits[currentExhibitIndex];
                break;
            } else {
                currentExhibitIndex--;
            }
        }

        return previousExhibit;
    }
}
