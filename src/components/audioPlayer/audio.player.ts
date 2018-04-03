import { Component, Input, NgZone, OnChanges, OnDestroy } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Media, MEDIA_ERROR, MEDIA_STATUS, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';

@Component({
    selector: 'audio-player',
    templateUrl: 'audio.player.html'
})
export class AudioPlayer implements OnDestroy, OnChanges {
    @Input('file') file: string;

    duration: number = 0;
    rangePosition: number = 0;

    private _audioFile: MediaObject;
    private _audioPosition: number = 0;
    private _timer: number;
    private _status: MEDIA_STATUS;

    private _pauseSubscription: any;
    private _resumeSubscription: any;

    constructor(private _media: Media, private _ngZone: NgZone, private _platform: Platform, private _file: File) {

        this._platform.ready().then(() => {
            this._pauseSubscription = this._platform.pause.subscribe(() => {
                console.log('PLATFORM PAUSE - AUDIO');
                clearInterval(this._timer);
                if (!!this._audioFile) {
                    this._audioFile.pause();
                }
            });

            this._resumeSubscription = this._platform.resume.subscribe(() => {
                console.log('PLATFORM RESUME - AUDIO');
                if (!!this._audioFile) {
                    this._startTimer();
                }
            });
        });
    }

    ngOnChanges(): void {
        if (!!this._audioFile) {
            this._audioFile.stop();
            this._audioFile.release();
            this._audioFile = null;
        }

        this.duration = 0;
        this.rangePosition = 0;
        this._audioPosition = 0;
        clearInterval(this._timer);
        this._loadAudioFile();
    }

    ngOnDestroy(): void {
        clearInterval(this._timer);
        this._pauseSubscription.unsubscribe();

        if (!!this._audioFile) {
            this._audioFile.stop();
            this._audioFile.release();
        }
    }

    audioPositionChanged() {
        if (this._audioPosition !== this.rangePosition) {
            this._audioFile.seekTo(this.rangePosition > 0 ? this.rangePosition * 1000 : 1); //weirdness when seeking to 0
            this._audioPosition = this.rangePosition;
        }
    }

    playPause(): void {
        if (!!this._audioFile) {
            if (this._status === MEDIA_STATUS.RUNNING) {
                this._audioFile.pause();
            } else {
                this._audioFile.play();
            }
        }
    }

    isPlaying(): boolean {
        return this._status === MEDIA_STATUS.RUNNING;
    }

    isLoaded(): boolean {
        return !!this._status;
    }

    private _onStatusUpdate(status: MEDIA_STATUS) {
        console.log('MEDIA STATUS', status);
        this._status = status;
    }

    private _onSuccess() {
        console.log('Finished Playback');
    }

    private _onError(error: MEDIA_ERROR) {
        console.error('MEDIA ERROR', error);
    }

    private _startTimer() {
        this._timer = setInterval(() => {

            if (!this.duration || this.duration <= 0) {
                this.duration = this._audioFile.getDuration();
            }

            this._audioFile.getCurrentPosition().then((position) => {
                this._ngZone.run(() => {
                    this._audioPosition = position;
                    this.rangePosition = position;
                });
            });

        }, 1000);
    }

    private _loadAudioFile(): void {

        this._platform.ready().then(() => {

            let path;

            if (this._platform.is('android')) {
                path = this._file.applicationDirectory + 'www/assets/audio/';
            } else if (this._platform.is('ios')) {
                path = 'cdvfile://localhost/bundle/www/assets/audio/';
            }

            if (this._platform.is('cordova')) {
                this._audioFile = this._media.create(`${path}${this.file}`);
                this._audioFile.onStatusUpdate.subscribe((status: MEDIA_STATUS) => this._onStatusUpdate(status));
                this._audioFile.onSuccess.subscribe(() => this._onSuccess());
                this._audioFile.onError.subscribe((error: MEDIA_ERROR) => this._onError(error));

                this._audioFile.seekTo(0); //do this to load the track and get duration
                this._startTimer();
            }

        });
    }
}
