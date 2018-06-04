import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Content, NavParams, Slides } from 'ionic-angular';
import { Artifact, Room } from '../../data/model/exhibit';
import { artifactsSlideInOutAnimation, textFadeOutAnimation } from './artifact.animation';
import { HelperTextService } from '../../services/helper.text.service';

@Component({
    selector: 'artifact-page',
    templateUrl: 'artifact.page.html',
    animations: [artifactsSlideInOutAnimation, textFadeOutAnimation]
})
export class ArtifactPage {
    @ViewChild('slider') slider: Slides;
    @ViewChild('content') content: Content;

    room: Room;

    currentIndex = 0;

    currentArtifacts: Artifact[] = []; //use this array to more easily allow animations

    slideState: string;

    get currentArtifact(): Artifact {
        return this.currentArtifacts[0];
    }

    constructor(public navParams: NavParams, public cdRef: ChangeDetectorRef, public helperTextService: HelperTextService) {
        this.room = Object.create(navParams.get('room'));
        this.currentArtifacts.push(Object.create(navParams.get('artifact')));
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
        this.slideState = 'next';
        this.cdRef.detectChanges(); //immediately change animation state

        this.helperTextService.turnOffHelperText();

        this.setCurrentArtifact(this.room.artifacts[this._getCurrentIndex() + 1]);
        this.slider.slideTo(0, 0, false);
        this.currentIndex = 0;

        setTimeout(() => {
            this.content.resize();
        });
    }

    previousArtifact(): void {
        this.slideState = 'previous';
        this.cdRef.detectChanges(); //immediately change animation state

        this.helperTextService.turnOffHelperText();

        this.setCurrentArtifact(this.room.artifacts[this._getCurrentIndex() - 1]);
        this.slider.slideTo(0, 0, false);
        this.currentIndex = 0;

        setTimeout(() => {
            this.content.resize();
        });
    }

    setCurrentArtifact(artifact: Artifact): void {
        this.currentArtifacts = [artifact];
    }

    isBold(paragraph: string): boolean {
        return paragraph.indexOf('<bold>') >= 0;
    }

    formatParagraph(paragraph: string): string {
        return paragraph.replace('<bold>', '');
    }

    private _getCurrentIndex(): number {
        return this.room.artifacts.findIndex((artifact) => {
            return artifact.name === this.currentArtifact.name;
        });
    }
}
