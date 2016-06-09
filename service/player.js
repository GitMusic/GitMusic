var ffmpeg = require('easy-ffmpeg');
var Speaker = require('speaker');

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
                    channels: channelStrToNum[details[2]]
                });
            })
            .format('s16le')
            .pipe();

        if (this.playing) this.play();
    }

    play() {
        this.playing = true;
        if (!this.pcmStream) return;
        this.pcmStream.on('data', (chunk, enc) => {
            if (!this.speaker) return console.log('Warning: Speaker uninitialized');
            this.speaker.write(chunk);
        });
    }

    pause() {
        this.playing = false;
        if (!this.stream) return;
        console.log('pause');
    }

    volume(volume) {
        console.log('volume');
    }

    shuffle(state) {
        console.log('shuffle', state);
    }

    next() {
        console.log('next');
    }

    prev() {
        console.log('prev');
    }

    seek(pos) {
        console.log('seek', pos);
    }
}

module.exports = Player;
