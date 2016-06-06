var Promise = require('bluebird');
var ytsearch = Promise.promisify(require('youtube-search'));
var ytdl = Promise.promisifyAll(require('ytdl-core'));

var config = require('../../config.json').youtube;

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
        var url = 'https://www.youtube.com/watch?v=' + encodeURIComponent(id);
        return ytdl.getInfoAsync(url).then(info => {
            var audioFormats = info.formats.filter(format => {
                return format.type.indexOf('audio') != -1;
            });

            var format = audioFormats[0];
            if (!format) throw new Error('No available audio stream');
            return ytdl.downloadFromInfo(info, {format: format});
        });
    },
}
