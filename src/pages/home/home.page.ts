import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { BrowseRoomsPage } from '../browseRooms/browse.rooms.page';
import { AudioTourIntroPage } from '../audioTour/audio.tour.intro.page';
import { AboutPage } from './about.page';
import { NewAudioTourPage } from '../audioTour/new.audio.tour.page';


@Component({
    selector: 'home-page',
    templateUrl: 'home.page.html'
})
export class HomePage {
    constructor(public navCtrl: NavController, public modalCtrl: ModalController) {
    }

    goToBrowseRoomsPage(): void {
        this.navCtrl.push(BrowseRoomsPage);
    }

    goToAudioTourPage(): void {
        this.navCtrl.push(NewAudioTourPage);
    }

    goToAboutPage(): void {
        const modal = this.modalCtrl.create(AboutPage);
        modal.present();
    }
}
