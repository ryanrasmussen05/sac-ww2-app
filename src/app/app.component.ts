import { Component, ViewChild } from '@angular/core';
import { MenuController, Nav, Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Insomnia } from '@ionic-native/insomnia';
import { HomePage } from '../pages/home/home.page';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

@Component({
    templateUrl: 'app.html'
})
export class AppComponent {
    @ViewChild(Nav) nav: Nav;

    rootPage = HomePage;

    constructor(public platform: Platform, public menu: MenuController, public statusBar: StatusBar,
                public splashScreen: SplashScreen, public insomnia: Insomnia, public screenOrientation: ScreenOrientation) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.splashScreen.hide();

            if (this.platform.is('android')) {
                this.statusBar.backgroundColorByName('black');
            } else {
                this.statusBar.styleDefault();
            }

            this.insomnia.keepAwake();

            if (this.platform.is('cordova')) {
                this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
            }
        });
    }
}
