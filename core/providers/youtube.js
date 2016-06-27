const Promise = require('bluebird');
const ytsearch = Promise.promisify(require('youtube-search'));
const ytdl = Promise.promisifyAll(require('ytdl-core'));

const config = require('../../config.json').youtube;

module.exports = {
    search: term =>
        ytsearch(term, {
            maxResults: 5,
            key: config.key
        })
        .then(results => results
              .filter(result => result.kind == 'youtube#video')
              .map(video => ({id: video.id}))),

    source: id => {
        const url = 'https://www.youtube.com/watch?v=' + encodeURIComponent(id);
        return ytdl.getInfoAsync(url).then(info => {
            const formats = info.formats;
            const audioFormats = formats.filter(format => {
                return format.type.indexOf('audio') != -1;
            });

            const format = audioFormats[0] || formats[0];
            return format.url;
        });
    },
}
