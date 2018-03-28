import { Component, OnDestroy } from '@angular/core';
import { NavParams, Platform, ViewController } from 'ionic-angular';
import { Room } from '../../data/model/exhibit';
import { AudioProvider, ITrackConstraint } from 'ionic-audio';

@Component({
    selector: 'room-detail-page',
    templateUrl: 'room.detail.page.html'
})
export class RoomDetailPage implements OnDestroy {
    room: Room;

    track: ITrackConstraint;

    private _pauseSubscription: any;

    constructor(params: NavParams, public viewCtrl: ViewController, public audioProvider: AudioProvider, platform: Platform) {
        this.room = params.get('room');

        this.track = {
            src: 'assets/audio/' + this.room.audio,
            preload: 'metadata'
        };

        platform.ready().then(() => {
            this._pauseSubscription = platform.pause.subscribe(() => {
                console.log('PLATFORM PAUSE - ROOM DETAIL PAGE');
                this.audioProvider.stop();
            });
        });
    }

    ngOnDestroy(): void {
        this.audioProvider.stop();
        this.audioProvider.tracks.length = 0;

        this._pauseSubscription.unsubscribe();
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}
