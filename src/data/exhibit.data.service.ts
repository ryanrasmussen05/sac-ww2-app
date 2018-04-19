import { Injectable } from '@angular/core';
import exhibit from './exhibitData/exhibit';
import blueRoom from './exhibitData/blue';
import brownRoom from './exhibitData/brown';
import greenRoom from './exhibitData/green';
import orangeRoom from './exhibitData/orange';
import redRoom from './exhibitData/red';
import yellowRoom from './exhibitData/yellow';
import { Exhibit } from './model/exhibit';

@Injectable()
export class ExhibitDataService {
    exhibit: Exhibit;

    constructor() {
        this.exhibit = exhibit;
        this.exhibit.rooms = [blueRoom, greenRoom, yellowRoom, brownRoom, orangeRoom, redRoom];
    }

    getExhibitData(): Exhibit {
        return this.exhibit;
    }
}
