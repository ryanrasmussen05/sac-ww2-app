import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'timer'})
export class TimerPipe implements PipeTransform {
    transform(value: number): string {
        const totalSeconds = Math.round(value);

        const totalMinutes = Math.floor(totalSeconds / 60.0);
        const remainingSeconds = totalSeconds % 60;

        const minutesString = totalMinutes > 0 ? totalMinutes.toString() : '0';
        const secondsString = remainingSeconds >= 10 ? remainingSeconds.toString() : '0' + remainingSeconds.toString();

        return minutesString + ':' + secondsString;
    }
}
