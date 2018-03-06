import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { Exhibit } from '../../data/model/exhibit';


@Component({
    selector: 'exhibit-page',
    templateUrl: 'exhibit.page.html'
})
export class ExhibitPage {
    exhibit: Exhibit;

    constructor(public navParams: NavParams) {
        this.exhibit = navParams.get('exhibit');
    }
}
