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

    duration: number;
    rangePosition: number;

    private _audioFile: MediaObject;
    private _audioPosition: number;

    private _status: MEDIA_STATUS;

    private _positionInterval: number;
    private _durationInterval: number;

    private _pauseSubscription: any;
    private _resumeSubscription: any;

    private _statusSubscription: any;
    private _successSubscription: any;
    private _errorSubscription: any;

    constructor(private _media: Media, private _ngZone: NgZone, private _platform: Platform, private _file: File) {

        this._platform.ready().then(() => {
            this._pauseSubscription = this._platform.pause.subscribe(() => {
                console.log('PLATFORM PAUSE - AUDIO PLAYER');

                clearInterval(this._positionInterval);

                //if paused while playing (ios handles pausing audio on its own)
                if (this.isLoaded() && this.isPlaying() && this._platform.is('android')) {
                    this._audioFile.pause();
                }
            });

            this._resumeSubscription = this._platform.resume.subscribe(() => {
                console.log('PLATFORM RESUME - AUDIO PLAYER');

                //resume position updates if audio file was previously playing
                if (this.isLoaded() && !!this._audioFile) {
                    this._updatePosition();
                }
            });
        });
    }

    ngOnChanges(): void {
        if (!!this._audioFile) {
            this._unsubscribeAudio();
            this._audioFile.stop();
            this._audioFile.release();
            this._audioFile = null;
        }

        this.duration = null;
        this._status = null;
        this.rangePosition = 0;
        this._audioPosition = 0;
        clearInterval(this._positionInterval);
        clearInterval(this._durationInterval);
        this._preloadAudioFile();
    }

    ngOnDestroy(): void {
        clearInterval(this._positionInterval);
        clearInterval(this._durationInterval);
        this._pauseSubscription.unsubscribe();
        this._resumeSubscription.unsubscribe();

        if (!!this._audioFile) {
            this._unsubscribeAudio();
            this._audioFile.stop();
            this._audioFile.release();
            this._audioFile = null;
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
            if (this.isPlaying()) {
                this._audioFile.pause();
            } else {
                this._audioFile.play();
            }
        } else {
            this._loadAndPlayAudioFile();
        }
    }

    isPlaying(): boolean {
        return this._status === MEDIA_STATUS.RUNNING;
    }

    isLoaded(): boolean {
        return !!this.duration;
    }

    private _onStatusUpdate(status: MEDIA_STATUS) {
        console.log('MEDIA STATUS', MEDIA_STATUS[status]);
        this._status = status;
    }

    private _onSuccess() {
        console.log('Track Stopped');
        this.rangePosition = 0;
    }

    private _onError(error: MEDIA_ERROR) {
        console.error('MEDIA ERROR', MEDIA_ERROR[error]);
    }

    private _loadAndPlayAudioFile(): void {
        if (this._platform.is('cordova')) {

            this._audioFile = this._media.create(this._getAudioFilePath());

            this._statusSubscription = this._audioFile.onStatusUpdate.subscribe((status: MEDIA_STATUS) => this._onStatusUpdate(status));
            this._successSubscription = this._audioFile.onSuccess.subscribe(() => this._onSuccess());
            this._errorSubscription = this._audioFile.onError.subscribe((error: MEDIA_ERROR) => this._onError(error));

            this._audioFile.play();
            this._updatePosition();
        }
    }

    private _preloadAudioFile(): void {
        if (this._platform.is('cordova')) {

            this._audioFile = this._media.create(this._getAudioFilePath());
            this._errorSubscription = this._audioFile.onError.subscribe((error: MEDIA_ERROR) => this._onError(error));

            this._getDuration();
        }
    }

    private _getAudioFilePath(): string {
        if (this._platform.is('android')) {
            return this._file.applicationDirectory + 'www/assets/audio/' + this.file;
        } else if (this._platform.is('ios')) {
            return 'cdvfile://localhost/bundle/www/assets/audio/' + this.file;
        }
    }

    private _getDuration() {
        this._audioFile.play();
        this._audioFile.setVolume(0.0);

        this._durationInterval = setInterval(() => {
            const duration = this._audioFile.getDuration();

            if (duration >= 0) {
                this._audioFile.stop();
                this._audioFile.release();
                this._audioFile = null;
                this._unsubscribeAudio();
                clearInterval(this._durationInterval);
                this.duration = duration;
            }
        }, 100);
    }

    private _updatePosition() {
        this._positionInterval = setInterval(() => {

            this._audioFile.getCurrentPosition().then((position) => {
                this._ngZone.run(() => {
                    if (position > -1) {
                        this._audioPosition = position;
                        this.rangePosition = position;
                    }
                });
            });

        }, 500);
    }

    private _unsubscribeAudio(): void {
        if (!!this._statusSubscription) {
            this._statusSubscription.unsubscribe();
            this._statusSubscription = null;
        }

        if (!!this._successSubscription) {
            this._successSubscription.unsubscribe();
            this._successSubscription = null;
        }

        if (!!this._errorSubscription) {
            this._errorSubscription.unsubscribe();
            this._errorSubscription = null;
        }
    }
}
