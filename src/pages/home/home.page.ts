import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IndividualExhibitsPage } from '../individualExhibits/individual.exhibits.page';
import { ContinuousExhibitsPage } from '../continuousExhibits/continuous.exhibits.page';

@Component({
    selector: 'home-page',
    templateUrl: 'home.page.html'
})
export class HomePage {
    constructor(public navCtrl: NavController) {
    }

    goToIndividualExhibits(): void {
        this.navCtrl.setRoot(IndividualExhibitsPage);
    }

    goToContinuousExhibits(): void {
        this.navCtrl.setRoot(ContinuousExhibitsPage);
    }
}
