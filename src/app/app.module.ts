import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Insomnia } from '@ionic-native/insomnia';
import { AppComponent } from './app.component';
import { HomePage } from '../pages/home/home.page';
import { ExhibitDataService } from '../data/exhibit.data.service';
import { ArtifactPage } from '../pages/artifact/artifact.page';
import { BrowseRoomsPage } from '../pages/browseRooms/browse.rooms.page';
import { AudioTourPage } from '../pages/audioTour/audio.tour.page';
import { RoomPage } from '../pages/room/room.page';
import { AudioTourIntroPage } from '../pages/audioTour/audio.tour.intro.page';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { IonicAudioModule, WebAudioProvider } from 'ionic-audio';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RoomDetailPage } from '../pages/browseRooms/room.detail.page';

export function myCustomAudioProviderFactory() {
    return new WebAudioProvider(); //cordova media player not working right
}

@NgModule({
    declarations: [
        AppComponent,
        HomePage,
        BrowseRoomsPage,
        AudioTourPage,
        RoomPage,
        ArtifactPage,
        AudioTourIntroPage,
        RoomDetailPage
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        IonicModule.forRoot(AppComponent),
        IonicImageViewerModule,
        IonicAudioModule.forRoot(myCustomAudioProviderFactory)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        AppComponent,
        HomePage,
        BrowseRoomsPage,
        AudioTourPage,
        RoomPage,
        ArtifactPage,
        AudioTourIntroPage,
        RoomDetailPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        ScreenOrientation,
        Insomnia,
        ExhibitDataService,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {
}
