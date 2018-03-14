import { Content, Slides } from 'ionic-angular';
import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { AudioProvider, AudioTrackComponent, ITrackConstraint } from 'ionic-audio';
import { ExhibitDataService } from '../../data/exhibit.data.service';
import { Artifact, Exhibit } from '../../data/model/exhibit';

@Component({
    selector: 'continuous-exhibits-page',
    templateUrl: 'continuous.exhibits.page.html'
})
export class ContinuousExhibitsPage implements AfterViewInit, OnDestroy {
    @ViewChild('content') content: Content;
    @ViewChild('slider') slider: Slides;
    @ViewChild('audioTrack') audioTrack: AudioTrackComponent;

    exhibits: Exhibit[];

    currentExhibit: Exhibit;
    currentArtifact: Artifact;

    currentPictureIndex: number;

    currentTrack: ITrackConstraint;

    artifactIndex: number;
    totalArtifacts: number;

    constructor(public exhibitDataService: ExhibitDataService, public audioProvider: AudioProvider) {
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
        });
    }

    ngAfterViewInit(): void {
        this._loadAudioTrack();
    }

    ngOnDestroy(): void {
        this.audioProvider.stop();
        this.audioProvider.tracks.length = 0;
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
            setTimeout(() => {
                this.currentArtifact = this.currentExhibit.artifacts[artifactIndexInExhibit + 1];
            });
        } else {
            setTimeout(() => {
                this.currentExhibit = this._getNextViewableExhibit();
                this.currentArtifact = this.currentExhibit.artifacts[0];
            });
        }

        this.currentPictureIndex = 0;
        this.slider.update();
        this.slider.slideTo(0, 0, false);
        this.content.scrollToTop(0);

        this._loadAudioTrack();
    }

    previousArtifact(): void {
        this.artifactIndex--;

        const artifactIndexInExhibit = this.currentExhibit.artifacts.indexOf(this.currentArtifact);

        if (artifactIndexInExhibit > 0) {
            setTimeout(() => {
                this.currentArtifact = this.currentExhibit.artifacts[artifactIndexInExhibit - 1];
            });
        } else {
            setTimeout(() => {
                this.currentExhibit = this._getPreviousViewableExhibit();
                this.currentArtifact = this.currentExhibit.artifacts[this.currentExhibit.artifacts.length - 1];
            });
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
            this.nextArtifact();
        } else {
            //TODO show notification that tour is over
        }
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

    private _loadAudioTrack(): void {
        this.currentTrack = {
            src: 'assets/audio/' + this.currentArtifact.audio,
            preload: 'metadata'
        };

        //wait for track to load
        setTimeout(() => { this.audioTrack.play() });
    }
}
