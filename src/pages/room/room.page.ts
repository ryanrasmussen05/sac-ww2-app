import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ArtifactPage } from '../artifact/artifact.page';
import { Artifact, Room } from '../../data/model/room';


@Component({
    selector: 'room-page',
    templateUrl: 'room.page.html'
})
export class RoomPage {
    room: Room;

    constructor(public navParams: NavParams, public navCtrl: NavController) {
        this.room = navParams.get('room');
    }

    artifactClicked(artifact: Artifact): void {
        this.navCtrl.push(ArtifactPage, {
            room: this.room,
            artifact: artifact
        });
    }
}
