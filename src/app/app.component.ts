import { Component, ViewChild } from '@angular/core';
import { MenuController, Nav, Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Insomnia } from '@ionic-native/insomnia';
import { AudioProvider } from 'ionic-audio';
import { HomePage } from '../pages/home/home.page';

@Component({
    templateUrl: 'app.html'
})
export class AppComponent {
    @ViewChild(Nav) nav: Nav;

    rootPage = HomePage;

    constructor(public platform: Platform, public menu: MenuController, public statusBar: StatusBar,
                public splashScreen: SplashScreen, public audioProvider: AudioProvider, public insomnia: Insomnia) {
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

            this.platform.pause.subscribe(() => {
                console.log('PLATFORM PAUSE');
                this.audioProvider.stop();
            });

            this.insomnia.keepAwake();
        });


    }
}
