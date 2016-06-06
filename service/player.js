var ffmpeg = require('fluent-ffmpeg');
var Speaker = require('speaker');

var config = require('../config.json');

var channelStrToNum = {
    'mono': 1,
    'stereo': 2
};

class Player {
    constructor() {
        this.playing = false;
        this.pcmStream = null;
        this.speaker = null;
    }

    stream(stream) {
        if (!stream) {
            this.pcmStream = null;
            return;
        }

        this.pcmStream = ffmpeg(stream)
            .on('codecData', data => {
                var details = data.audio_details;
                this.speaker = new Speaker({
                    sampleRate: parseInt(details[1], 10),
                    channels: channelStrToNum[details[2]],
                    bitDepth: config.bitDepth
                });

                if (this.playing) this.play();
            })
            .format(config.bitDepth == 8 ?
                    'u8' : 's' + config.bitDepth + 'le')
            .pipe();
    }

    play() {
        this.playing = true;
        if (!this.pcmStream && !this.speaker) return;
        this.pcmStream.pipe(this.speaker);
    }

    pause() {
        this.playing = false;
        if (!this.pcmStream && !this.speaker) return;
        this.pcmStream.unpipe(this.speaker);
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
