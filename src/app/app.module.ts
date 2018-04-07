import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Insomnia } from '@ionic-native/insomnia';
import { Media } from '@ionic-native/media';
import { File } from '@ionic-native/file';
import { AppComponent } from './app.component';
import { HomePage } from '../pages/home/home.page';
import { ExhibitDataService } from '../data/exhibit.data.service';
import { ArtifactPage } from '../pages/artifact/artifact.page';
import { BrowseRoomsPage } from '../pages/browseRooms/browse.rooms.page';
import { RoomPage } from '../pages/room/room.page';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AboutPage } from '../pages/home/about.page';
import { RoomDetailPage } from '../pages/room/room.detail.page';
import { NewAudioTourPage } from '../pages/audioTour/new.audio.tour.page';
import { AudioPlayer } from '../components/audioPlayer/audio.player';
import { TimerPipe } from '../components/audioPlayer/timer.pipe';

@NgModule({
    declarations: [
        AppComponent,
        HomePage,
        BrowseRoomsPage,
        RoomPage,
        ArtifactPage,
        RoomDetailPage,
        AboutPage,
        NewAudioTourPage,
        AboutPage,
        AudioPlayer,
        TimerPipe
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        IonicModule.forRoot(AppComponent),
        IonicImageViewerModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        AppComponent,
        HomePage,
        BrowseRoomsPage,
        RoomPage,
        ArtifactPage,
        RoomDetailPage,
        AboutPage,
        NewAudioTourPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        ScreenOrientation,
        Insomnia,
        Media,
        ExhibitDataService,
        File,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {
}
