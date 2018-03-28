import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { ExhibitDataService } from '../../data/exhibit.data.service';

@Component({
    selector: 'about-page',
    templateUrl: 'about.page.html'
})
export class AboutPage {
    aboutText: string;

    constructor(exhibitDataService: ExhibitDataService, public viewCtrl: ViewController) {
        this.aboutText = exhibitDataService.getExhibitData().description;
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}
