const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const path = require('path');

const cache = require('./config.json').cache;
const Player = require('./service/player');
const youtube = require('./service/providers/youtube');

function stream(id) {
    let cacheFile = path.join(cache.dir, id);
    let stats = cache.enabled ? fs.statSync(cacheFile) : null;
    youtube.stream(id).then(stream => {
        stream.on('response', res => {
            let size = parseInt(res.headers['content-length'], 10);
            console.log('Started downloading: ' + id + ' (' + size + ' bytes)');

            // Show download progress in stdout
            let total = 0;
            stream.on('data', chunk => {
                total += chunk.length;
                let percent = total / size * 100;
                console.log('Downloaded: ' + percent.toFixed(2) + '% of ' + id);
            });
        });
    });
}

function streamFirstResult(term) {
    return youtube.search(term)
        .then(videos => videos[0].id)
        .then(stream);
}

let player = new Player();
player.play();

streamFirstResult(process.argv.slice(2).join(' '))
    .then(stream => player.stream(stream));
