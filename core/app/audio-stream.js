const Readable = require('stream').Readable;
const ffmpegPath = require('ffmpeg-static').path;
const spawn = require('child_process').spawn;
const stderr = require('process').stderr;

const config = require('../../config.json');
const playback = config.playback;

class AudioStream extends Readable {
    constructor(source, options) {
        super(options);
        this._source = source;
        this._audio = null;
        this.seek(0);
    }

    seek(seconds) {
        if (this._audio) {
            this._audio.destroy();
        }

        const seek = seconds ? ['-ss', seconds] : [];
        const args = [
            '-i', this._source,
            '-ar', playback.sampleRate || 44100,
            '-ac', playback.channels || 2,
            '-f', playback.bitDepth == 8 ? 'u8' : `s${playback.bitDepth}le`,
            '-'
        ];

        const ffmpeg = spawn(ffmpegPath, seek.concat(args));
        this._audio = ffmpeg.stdout;

        this._audio.on('data', chunk => {
            if (!this.push(chunk)) {
                this._audio.pause();
            }
        });

        this._audio.on('end', () => {
            this.push(null);
        });

        if (config.developer.enabled && config.developer.ffmpegDebug) {
            ffmpeg.stderr.pipe(stderr);
        }
    }

    _read() {
        this._audio.resume();
    }
}

module.exports = AudioStream;
