import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { ExhibitDataService } from '../../data/exhibit.data.service';
import { Exhibit } from '../../data/model/exhibit';

@Component({
    selector: 'about-page',
    templateUrl: 'about.page.html'
})
export class AboutPage {
    exhibit: Exhibit;

    constructor(exhibitDataService: ExhibitDataService, public viewCtrl: ViewController) {
        this.exhibit = exhibitDataService.getExhibitData();
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}
