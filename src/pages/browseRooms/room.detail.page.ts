import { Component } from '@angular/core';
import { Room } from '../../data/model/room';
import { NavParams, ViewController } from 'ionic-angular';

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
