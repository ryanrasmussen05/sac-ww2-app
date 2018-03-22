import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BrowseRoomsPage } from '../browseRooms/browse.rooms.page';
import { AudioTourIntroPage } from '../audioTour/audio.tour.intro.page';


@Component({
    selector: 'home-page',
    templateUrl: 'home.page.html'
})
export class HomePage {
    constructor(public navCtrl: NavController) {
    }

    goToBrowseRoomsPage(): void {
        this.navCtrl.push(BrowseRoomsPage);
    }

    goToAudioTourPage(): void {
        this.navCtrl.push(AudioTourIntroPage);
    }
}
