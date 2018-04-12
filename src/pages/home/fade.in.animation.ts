import { animate, style, transition, trigger } from '@angular/animations';

export const fadeInAnimation =
    trigger('fadeIn', [

        transition(':enter', [
            style( {opacity: 0}), //apply this style immediately
            animate('1s 2.5s ease-in', style({opacity: 1})) //animate to this style
        ])
    ]);
