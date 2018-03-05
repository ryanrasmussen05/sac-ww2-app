import { Component, ViewChild } from '@angular/core';

import { MenuController, Nav, Platform } from 'ionic-angular';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home.page';
import { IndividualExhibitsPage } from '../pages/individualExhibits/individual.exhibits.page';
import { ContinuousExhibitsPage } from '../pages/continuousExhibits/continuous.exhibits.page';

interface Page {
    title: string;
    component: any;
}


@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage = HomePage;
    pages: Page[];

    constructor(public platform: Platform, public menu: MenuController, public statusBar: StatusBar, public splashScreen: SplashScreen) {
        this.initializeApp();

        this.pages = [
            {title: 'Home', component: HomePage},
            {title: 'Individual Exhibits', component: IndividualExhibitsPage},
            {title: 'Continuous Exhibits', component: ContinuousExhibitsPage},
            {title: 'Hello Ionic', component: HelloIonicPage},
            {title: 'My First List', component: ListPage}
        ];
    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    openPage(page) {
        this.menu.close();
        this.nav.setRoot(page.component);
    }
}
