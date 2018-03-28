import { Component } from '@angular/core';
import { ModalController, NavController, NavParams } from 'ionic-angular';
import { ArtifactPage } from '../artifact/artifact.page';
import { RoomDetailPage } from './room.detail.page';
import { Artifact, Room } from '../../data/model/exhibit';


@Component({
    selector: 'room-page',
    templateUrl: 'room.page.html'
})
export class RoomPage {
    room: Room;

    constructor(public navParams: NavParams, public navCtrl: NavController, public modalCtrl: ModalController) {
        this.room = navParams.get('room');
    }

    artifactClicked(artifact: Artifact): void {
        this.navCtrl.push(ArtifactPage, {
            room: this.room,
            artifact: artifact
        });
    }

    roomInfo(event: any): void {
        event.stopPropagation();

        const modal = this.modalCtrl.create(RoomDetailPage, {room: this.room});
        modal.present();
    }
}
