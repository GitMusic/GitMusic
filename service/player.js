const Speaker = require('speaker');

const playback = require('../config.json').playback;

class Player {
    constructor() {
        this._playing = false;
        this._stream = null;
        this._speaker = new Speaker({
            sampleRate: playback.sampleRate,
            channels: playback.channels,
            bitDepth: playback.bitDepth
        });
    }

    stream(stream) {
        if (!stream) return;

        if (this._stream) this._stream.unpipe(this._speaker);
        this._stream = stream;
        if (this._playing) this._stream.pipe(this._speaker);
    }

    play() {
        this._playing = true;
        if (this._stream) this._stream.pipe(this._speaker);
    }

    pause() {
        this._playing = false;
        if (this._stream) this._stream.unpipe(this._speaker);
    }

    volume(volume) {
        console.log('volume');
    }

    seek(pos) {
        console.log('seek', pos);
    }

    next() {
        console.log('next');
    }

    prev() {
        console.log('prev');
    }

    shuffle(state) {
        console.log('shuffle', state);
    }
}

module.exports = Player;
