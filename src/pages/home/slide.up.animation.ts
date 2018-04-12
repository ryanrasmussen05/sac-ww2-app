import { animate, group, style, transition, trigger } from '@angular/animations';

export const slideUpAnimation =
    trigger('slideUp', [

        transition(':enter', [
            style( {top: '50%', transform: 'translateY(-50%)', opacity: 0}), //apply this style immediately

            group([
                animate('1s 0.5s ease-in', style({opacity: 1})),
                animate('1s 2.5s ease-in-out', style({top: '0%', transform: 'translateY(0%)'}))
            ])
        ])
    ]);
