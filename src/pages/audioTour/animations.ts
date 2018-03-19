import { animate, state, style, transition, trigger } from '@angular/animations';

export const slideInOutAnimation =
    trigger('slideInOut', [
        state('*', style({transform: 'translateX(0)'})),

        transition('void => next', [
            style({transform: 'translateX(100%)'}), //receives this style immediately
            animate('0.3s ease-in-out') //animates to default style
        ]),

        transition('next => void', [
            animate('0.3s ease-in-out', style({transform: 'translateX(-100%)'})) //starts at default style, animate to supplied style
        ]),

        transition('void => previous', [
            style({transform: 'translateX(-100%)'}),
            animate('0.3s ease-in-out')
        ]),

        transition('previous => void', [
            animate('0.3s ease-in-out', style({transform: 'translateX(100%)'}))
        ])
    ]);
