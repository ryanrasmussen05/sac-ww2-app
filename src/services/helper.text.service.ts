import { Injectable } from '@angular/core';

@Injectable()
export class HelperTextService {
    shouldShowHelperText: boolean = false;

    constructor() {
    }

    turnOffHelperText(): void {
        this.shouldShowHelperText = false;
    }

    turnOnHelperText(): void {
        this.shouldShowHelperText = true;
    }
}
