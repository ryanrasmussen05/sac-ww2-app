import { Component, ViewChild } from '@angular/core';
import { MenuController, Nav, Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HomePage } from '../pages/home/home.page';

@Component({
    templateUrl: 'app.html'
})
export class AppComponent {
    @ViewChild(Nav) nav: Nav;

    rootPage = HomePage;

    constructor(public platform: Platform, public menu: MenuController, public statusBar: StatusBar, public splashScreen: SplashScreen) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.splashScreen.hide();

            if (this.platform.is('android')) {
                this.statusBar.backgroundColorByName('black');
            } else {
                this.statusBar.styleDefault();
            }
        });
    }
}
