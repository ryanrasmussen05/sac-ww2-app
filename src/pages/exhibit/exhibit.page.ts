import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Artifact, Exhibit } from '../../data/model/exhibit';
import { ArtifactPage } from '../artifact/artifact.page';


@Component({
    selector: 'exhibit-page',
    templateUrl: 'exhibit.page.html'
})
export class ExhibitPage {
    exhibit: Exhibit;

    constructor(public navParams: NavParams, public navCtrl: NavController) {
        this.exhibit = navParams.get('exhibit');
    }

    artifactClicked(artifact: Artifact): void {
        this.navCtrl.push(ArtifactPage, {
            exhibit: this.exhibit,
            artifact: artifact
        });
    }
}
