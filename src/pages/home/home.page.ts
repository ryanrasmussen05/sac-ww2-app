import { Component, OnDestroy } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { BrowseRoomsPage } from '../browseRooms/browse.rooms.page';
import { AudioTourIntroPage } from '../audioTour/audio.tour.intro.page';


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

    goToBrowseRoomsPage(): void {
        this.navCtrl.push(BrowseRoomsPage);
    }

    goToAudioTourPage(): void {
        this.navCtrl.push(AudioTourIntroPage);
    }
}
