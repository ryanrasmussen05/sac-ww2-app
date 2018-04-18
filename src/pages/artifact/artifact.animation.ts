import { animate, state, style, transition, trigger } from '@angular/animations';

export const artifactsSlideInOutAnimation =
    trigger('artifactSlideInOut', [
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

export const textFadeOutAnimation =
    trigger('textFadeOut', [
        state('*', style({opacity: 0})),

        transition(':enter', [
            style( {opacity: 1}), //apply this style immediately
            animate('1s 3s', style({opacity: 0})) //animate to this style
        ])
    ]);
