import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { AppComponent } from './app.component';
import { HomePage } from '../pages/home/home.page';
import { IndividualExhibitsPage } from '../pages/individualExhibits/individual.exhibits.page';
import { ContinuousExhibitsPage } from '../pages/continuousExhibits/continuous.exhibits.page';
import { ExhibitDataService } from '../data/exhibit.data.service';
import { ExhibitPage } from '../pages/exhibit/exhibit.page';
import { ArtifactPage } from '../pages/artifact/artifact.page';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { defaultAudioProviderFactory, IonicAudioModule } from 'ionic-audio';

@NgModule({
    declarations: [
        AppComponent,
        HomePage,
        IndividualExhibitsPage,
        ContinuousExhibitsPage,
        ExhibitPage,
        ArtifactPage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(AppComponent, {
            //mode: 'ios'
        }),
        IonicImageViewerModule,
        IonicAudioModule.forRoot(defaultAudioProviderFactory)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        AppComponent,
        HomePage,
        IndividualExhibitsPage,
        ContinuousExhibitsPage,
        ExhibitPage,
        ArtifactPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        ScreenOrientation,
        ExhibitDataService,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {
}
