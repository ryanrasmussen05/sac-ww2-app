import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home.page';
import { IndividualExhibitsPage } from '../pages/individualExhibits/individual.exhibits.page';
import { ContinuousExhibitsPage } from '../pages/continuousExhibits/continuous.exhibits.page';

@NgModule({
    declarations: [
        MyApp,
        HelloIonicPage,
        ItemDetailsPage,
        ListPage,
        HomePage,
        IndividualExhibitsPage,
        ContinuousExhibitsPage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp, {
            //mode: 'ios'
        }),
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HelloIonicPage,
        ItemDetailsPage,
        ListPage,
        HomePage,
        IndividualExhibitsPage,
        ContinuousExhibitsPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {
}
