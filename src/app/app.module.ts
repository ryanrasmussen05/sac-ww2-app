import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AppComponent } from './app.component';
import { HomePage } from '../pages/home/home.page';
import { IndividualExhibitsPage } from '../pages/individualExhibits/individual.exhibits.page';
import { ContinuousExhibitsPage } from '../pages/continuousExhibits/continuous.exhibits.page';
import { ExhibitDataService } from '../data/exhibit.data.service';
import { ExhibitPage } from '../pages/exhibit/exhibit.page';

@NgModule({
    declarations: [
        AppComponent,
        HomePage,
        IndividualExhibitsPage,
        ContinuousExhibitsPage,
        ExhibitPage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(AppComponent, {
            //mode: 'ios'
        }),
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        AppComponent,
        HomePage,
        IndividualExhibitsPage,
        ContinuousExhibitsPage,
        ExhibitPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        ExhibitDataService,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {
}
