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
              .map(video => ({
                  id: video.id
              }))),

    stream: id => {
        let url = 'https://www.youtube.com/watch?v=' + encodeURIComponent(id);
        return ytdl.getInfoAsync(url).then(info => {
            let formats = info.formats;
            let audioFormats = formats.filter(format => {
                return format.type.indexOf('audio') != -1;
            });

            return ytdl.downloadFromInfo(info, {
                format: audioFormats[0] || formats[0]
            });
        });
    },
}
