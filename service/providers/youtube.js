const spawn = require('child_process').spawn;

const Promise = require('bluebird');
const ytsearch = Promise.promisify(require('youtube-search'));
const ytdl = Promise.promisifyAll(require('ytdl-core'));

const config = require('../../config.json');
const playback = config.playback;

module.exports = {
    search: term =>
        ytsearch(term, {
            maxResults: 5,
            key: config.youtube.key
        })
        .then(results => results
              .filter(result => result.kind == 'youtube#video')
              .map(video => ({
                  id: video.id
              }))),

    stream: id => {
        const url = 'https://www.youtube.com/watch?v=' + encodeURIComponent(id);
        return ytdl.getInfoAsync(url).then(info => {
            const formats = info.formats;
            const audioFormats = formats.filter(format => {
                return format.type.indexOf('audio') != -1;
            });

            const format = audioFormats[0] || formats[0];
            const ffmpeg = spawn('ffmpeg', [
                '-i', format.url,
                '-ar', playback.sampleRate || 44100,
                '-ac', playback.channels || 2,
                '-f', playback.bitDepth == 8 ? 'u8' : 's' + playback.bitDepth + 'le',
                '-'
            ]);

            ffmpeg.stderr.on('data', data => {
                console.log(data.toString());
            });

            return ffmpeg.stdout;
        });
    },
}
