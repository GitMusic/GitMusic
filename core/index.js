const AudioStream = require('./audio-stream');
const Player = require('./player');
const youtube = require('./providers/youtube');

let player = new Player();
player.play();

youtube.search(process.argv.slice(2).join(' '))
    .then(videos => videos[0].id)
    .then(youtube.source)
    .then(source => player.stream(new AudioStream(source)));
