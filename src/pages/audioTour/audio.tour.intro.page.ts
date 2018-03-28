import { Component} from '@angular/core';
import { NavController } from 'ionic-angular';
import { AudioTourPage } from './audio.tour.page';

@Component({
    selector: 'audio-tour-intro-page',
    templateUrl: 'audio.tour.intro.page.html'
})
export class AudioTourIntroPage {

    constructor(public navCtrl: NavController) {
    }

    beginTour(): void {
        //remove intro page from stack so pressing back from tour will go straight home
        this.navCtrl.push(AudioTourPage).then(() => {
            const index = this.navCtrl.getActive().index;
            this.navCtrl.remove(index - 1);
        });
    }
}
