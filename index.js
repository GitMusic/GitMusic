var fs = require('fs');
var path = require('path');

var config = require('./config.json');
var Player = require('./service/player');
var youtube = require('./service/providers/youtube');

function streamFirstResult(term) {
    return youtube.search(term)
        .then(videos => {
            var first = videos[0];
            return [youtube.stream(first.id), first.id];
        })
        .spread((stream, id) => {
            var download = {total: 0};
            stream.on('response', res => {
                download.size = parseInt(res.headers['content-length'], 10);
                console.log('Started downloading: ' + id + ' (' + download.size + ' bytes)');
            });

            stream.on('data', chunk => {
                download.total += chunk.length;
                var percent = download.total / download.size * 100;
                console.log('Downloaded: ' + percent.toFixed(2) + '% of ' + id);
            });

            // Cache stream
            var cachefile = path.join(config.cacheDir, id);
            stream.pipe(fs.createWriteStream(cachefile));
            return stream;
        });
}

var player = new Player();
player.play();

streamFirstResult('wish you were here')
    .then(stream => player.stream(stream));
