import { Injectable } from '@angular/core';
import { Exhibit } from './model/exhibit';
import blueExhibit from './exhibitData/blue';
import brownExhibit from './exhibitData/brown';
import greenExhibit from './exhibitData/green';
import orangeExhibit from './exhibitData/orange';
import redExhibit from './exhibitData/red';
import yellowExhibit from './exhibitData/yellow';

@Injectable()
export class ExhibitDataService {
    exhibits: Exhibit[];

    constructor() {
        this.exhibits = [blueExhibit, brownExhibit, greenExhibit, orangeExhibit, redExhibit, yellowExhibit];
    }

    getExhibitData(): Exhibit[] {
        return this.exhibits;
    }

}
