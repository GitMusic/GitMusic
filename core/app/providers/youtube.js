const Promise = require('bluebird');
const ytsearch = Promise.promisify(require('youtube-search'));
const ytdl = Promise.promisifyAll(require('ytdl-core'));

const config = require('../../../config.json').sources.youtube;

module.exports = {
    search(query) {
        return ytsearch(query, {
            maxResults: 5,
            key: config.key
        }).then(results => results
                .filter(result => result.kind == 'youtube#video')
                .map(video => ({id: video.id})))
    },
    load(song) {
        const url = `https://www.youtube.com/watch?v=${encodeURIComponent(song)}`;
        return ytdl.getInfoAsync(url).then(info => {
            const formats = info.formats;
            const audioFormats = formats.filter(format => {
                return format.type.indexOf('audio') != -1;
            });

            const format = audioFormats[0] || formats[0];
            return format.url;
        });
    },
};
