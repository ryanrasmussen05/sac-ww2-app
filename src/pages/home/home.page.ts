import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { BrowseRoomsPage } from '../browseRooms/browse.rooms.page';
import { AboutPage } from './about.page';
import { AudioTourPage } from '../audioTour/audio.tour.page';
import { slideUpAnimation } from './slide.up.animation';
import { fadeInAnimation } from './fade.in.animation';


@Component({
    selector: 'home-page',
    templateUrl: 'home.page.html',
    animations: [slideUpAnimation, fadeInAnimation]
})
export class HomePage {
    constructor(public navCtrl: NavController, public modalCtrl: ModalController) {
    }

    goToBrowseRoomsPage(): void {
        this.navCtrl.push(BrowseRoomsPage);
    }

    goToAudioTourPage(): void {
        this.navCtrl.push(AudioTourPage);
    }

    goToAboutPage(): void {
        const modal = this.modalCtrl.create(AboutPage);
        modal.present();
    }
}
