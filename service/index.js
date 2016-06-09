const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const path = require('path');

const cache = require('../config.json').cache;
const Player = require('./player');
const youtube = require('./providers/youtube');

function stream(id) {
    let cacheFile = path.join(cache.dir, id);

    let stats = null;
    if (cache.enabled) {
        try {
            stats = fs.statSync(cacheFile);
        } catch (err) {}
    }

    return youtube.stream(id).then(stream => {
        return new Promise((resolve, reject) => {
            stream.on('response', res => {
                let size = parseInt(res.headers['content-length'], 10);

                if (cache.enabled) {
                    if (stats && stats.size == size) {
                        console.log('Reading from cache: ' + cacheFile);
                        resolve(fs.createReadStream(cacheFile));
                    } else {
                        console.log('Streaming and saving to cache: ' + cacheFile)
                        stream.pipe(fs.createWriteStream(cacheFile));
                        resolve(stream);
                    }
                } else {
                    console.log('Started streaming: ' + id);
                    resolve(stream);
                }

                // Show download progress in stdout
                // let total = 0;
                // stream.on('data', chunk => {
                //     total += chunk.length;
                //     let percent = total / size * 100;
                //     console.log('Downloaded: ' + percent.toFixed(2) + '% of ' + id);
                // });
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
