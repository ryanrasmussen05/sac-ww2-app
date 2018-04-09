import { animate, style, transition, trigger } from '@angular/animations';

export const audioTourSlideInOutAnimation =
    trigger('audioTourSlideInOut', [

        transition('next => void', [
            style( {order: -1}), //apply this style immediately
            animate('0.5s ease-in-out', style({order: -1, 'margin-left': '-100%'})) //animate to this style
        ]),

        transition('void => previous', [
            style({order: -1, 'margin-left': '-100%'}),
            animate('0.5s ease-in-out', style({order: -1, 'margin-left': '0'}))
        ]),

        transition('previous => void', [
            animate('0.5s ease-in-out')
        ])
    ]);
