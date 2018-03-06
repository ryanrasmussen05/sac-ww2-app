import { Component } from '@angular/core';
import { ExhibitDataService } from '../../data/exhibit.data.service';
import { Exhibit } from '../../data/model/exhibit';
import { NavController } from 'ionic-angular';
import { ExhibitPage } from '../exhibit/exhibit.page';

@Component({
    selector: 'individual-exhibits-page',
    templateUrl: 'individual.exhibits.page.html'
})
export class IndividualExhibitsPage {
    exhibits: Exhibit[];

    constructor(public navCtrl: NavController, public exhibitDataService: ExhibitDataService) {
        this.exhibits = exhibitDataService.getExhibitData();
    }

    exhibitClicked(exhibit: Exhibit): void {
        this.navCtrl.push(ExhibitPage, {
            exhibit: exhibit
        });
    }
}
