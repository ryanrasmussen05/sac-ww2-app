import { Component } from '@angular/core';
import { ExhibitDataService } from '../../data/exhibit.data.service';
import { Room } from '../../data/model/room';
import { NavController } from 'ionic-angular';
import { RoomPage } from '../room/room.page';

@Component({
    selector: 'browse-rooms-page',
    templateUrl: 'browse.rooms.page.html'
})
export class BrowseRoomsPage {
    rooms: Room[];

    constructor(public navCtrl: NavController, public exhibitDataService: ExhibitDataService) {
        this.rooms = exhibitDataService.getExhibitData();
    }

    roomClicked(room: Room): void {
        this.navCtrl.push(RoomPage, {
            room: room
        });
    }
}
