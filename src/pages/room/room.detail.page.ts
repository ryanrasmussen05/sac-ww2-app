import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { Room } from '../../data/model/exhibit';

@Component({
    selector: 'room-detail-page',
    templateUrl: 'room.detail.page.html'
})
export class RoomDetailPage {
    room: Room;

    constructor(params: NavParams, public viewCtrl: ViewController) {
        this.room = params.get('room');
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}
