import { Component, OnDestroy } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { IndividualExhibitsPage } from '../individualExhibits/individual.exhibits.page';
import { ContinuousExhibitsPage } from '../continuousExhibits/continuous.exhibits.page';

@Component({
    selector: 'home-page',
    templateUrl: 'home.page.html'
})
export class HomePage implements OnDestroy {
    constructor(public navCtrl: NavController, public screenOrientation: ScreenOrientation, public platform: Platform) {
        if (platform.is('cordova')) {
            this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
        }
    }

    ngOnDestroy(): void {
        if (this.platform.is('cordova')) {
            this.screenOrientation.unlock();
        }
    }

    goToIndividualExhibits(): void {
        this.navCtrl.setRoot(IndividualExhibitsPage);
    }

    goToContinuousExhibits(): void {
        this.navCtrl.setRoot(ContinuousExhibitsPage);
    }
}
