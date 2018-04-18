import { Component } from '@angular/core';
import { ExhibitDataService } from '../../data/exhibit.data.service';
import { ModalController, NavController } from 'ionic-angular';
import { RoomPage } from '../room/room.page';
import { RoomDetailPage } from '../room/room.detail.page';
import { Room } from '../../data/model/exhibit';
import { HelperTextService } from '../../services/helper.text.service';

@Component({
    selector: 'browse-rooms-page',
    templateUrl: 'browse.rooms.page.html'
})
export class BrowseRoomsPage {
    rooms: Room[];

    constructor(public navCtrl: NavController, public exhibitDataService: ExhibitDataService,
                public modalCtrl: ModalController, public helperTextService: HelperTextService) {
        this.rooms = exhibitDataService.getExhibitData().rooms;
    }

    roomClicked(room: Room): void {
        this.helperTextService.turnOnHelperText();

        this.navCtrl.push(RoomPage, {
            room: room
        });
    }

    roomInfo(room: Room, event: any): void {
        event.stopPropagation();

        const modal = this.modalCtrl.create(RoomDetailPage, {room: room});
        modal.present();
    }
}
