const Speaker = require('audio-speaker');

const AudioStream = require('./audio-stream');
const config = require('../../config.json').playback;
const providers = require('./providers');
const debug = require('./utils/debug');

class Player {
    constructor() {
        this._playing = false;
        this._loaded = false;
        this._audio = null;
        this._speaker = new Speaker({
            sampleRate: config.sampleRate,
            channels: config.channels,
            bitDepth: config.bitDepth
        });
        this._queue = [];
        this._history = [];
    }

    search(query) {
        return providers.search(query);
    }

    load(provider, id) {
        this._history.push({
            provider: provider,
            id: id
        });
        providers.load(provider, id).then(source => {
            this.stop();
            this._audio = source ? new AudioStream(source) : null;
            if (this._audio) {
                this._audio.pipe(this._speaker);
                this._loaded = true;
                this.play();
            }
        });
    }

    stop() {
        if (this._audio) {
            this._audio.unpipe(this._speaker);
            this._audio = null;
            this._playing = false;
            this._loaded = false;
        }
    }

    play() {
        if (this._playing) throw 'Already playing';
        if (this._audio) this._audio.pipe(this._speaker);
        this._playing = true;
    }

    pause() {
        if (!this.playing) throw 'Already paused';
        if (this._audio) this._audio.unpipe(this._speaker);
        this._playing = false;
    }

    seek(seconds) {
        if (!this._audio) throw 'No audio loaded';
        this._audio.seek(seconds);
    }

    volume(volume) {
        debug.log(debug.level.info, 'volume');
    }

    next() {
        if(this._queue.length > 0) {
            let next = this._queue.shift();
            this.load(next.provider, next.id);
        }
    }

    previous() {
        //TODO: Deal with empty history
        if (this._history.length > 0) {
            let next = this._history.pop();
        } else {
            debug.log(debug.level.warning, "No songs in history")
        }
    }

    queue(provider, id) {
        this._queue.push({
            p: provider,
            i: id
        });
    }

    shuffle(state) {
        console.log('shuffle', state);
    }

    get playing() {
        return this._playing;
    }

    get loaded() {
        return this._loaded;
    }
}

module.exports = Player;
