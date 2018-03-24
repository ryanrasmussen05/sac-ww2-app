import { Injectable } from '@angular/core';
import { Room } from './model/room';
import blueRoom from './exhibitData/blue';
import brownRoom from './exhibitData/brown';
import greenRoom from './exhibitData/green';
import orangeRoom from './exhibitData/orange';
import redRoom from './exhibitData/red';
import yellowRoom from './exhibitData/yellow';

@Injectable()
export class ExhibitDataService {
    rooms: Room[];

    constructor() {
        this.rooms = [blueRoom, greenRoom, brownRoom, orangeRoom, redRoom, yellowRoom];
    }

    getExhibitData(): Room[] {
        return this.rooms;
    }

}
