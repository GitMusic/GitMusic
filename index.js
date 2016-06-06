const fs = require('fs');
const path = require('path');

const cache = require('./config.json').cache;
const Player = require('./service/player');
const youtube = require('./service/providers/youtube');

function streamFirstResult(term) {
    return youtube.search(term)
        .then(videos => {
            let first = videos[0];
            return [youtube.stream(first.id), first.id];
        })
        .spread((stream, id) => {
            // Show download progress in stdout
            stream.on('response', res => {
                let size, total = 0;
                size = parseInt(res.headers['content-length'], 10);
                console.log('Started downloading: ' + id + ' (' + size + ' bytes)');

                stream.on('data', chunk => {
                    total += chunk.length;
                    let percent = total / size * 100;
                    console.log('Downloaded: ' + percent.toFixed(2) + '% of ' + id);
                });
            });

            // Cache stream
            if (cache.enabled) {
                let cachefile = path.join(cache.dir, id);
                stream.pipe(fs.createWriteStream(cachefile));
            }

            return stream;
        });
}

let player = new Player();
player.play();

streamFirstResult(process.argv.slice(2).join(' '))
    .then(stream => player.stream(stream));
