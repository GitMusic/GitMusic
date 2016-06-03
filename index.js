var fs = require('fs');
var path = require('path');
var search = require('youtube-search');
var ytdl = require('ytdl-core');
var ffmpeg = require('fluent-ffmpeg');
var Speaker = require('speaker');

var config = require('./config.json');

function streamYoutubeAudio(id, callback) {
    var url = 'https://www.youtube.com/watch?v=' + encodeURIComponent(id);
    ytdl.getInfo(url, function(err, info) {
        if (err) return callback(err);

        var audioFormats = info.formats.filter(function(format) {
            return format.type.indexOf('audio') != -1;
        });

        console.log(audioFormats);

        var format = audioFormats[0];
        if (!format) return callback('No available audio stream');

        callback(null, ytdl.downloadFromInfo(info, {
            format: format
        }));
    });
}

function playYoutubeAudio(id) {
    var cachefile = path.join(config.cacheDir, id);
    streamYoutubeAudio(id, function(err, stream) {
        if (err) return console.log(err);

        // Handle stream download
        var download = {total: 0};
        stream.on('response', function(res) {
            download.size = parseInt(res.headers['content-length'], 10);
            console.log('Started downloading: ' + id + ' (' + download.size + ' bytes)');
        });

        stream.on('data', function(chunk) {
            download.total += chunk.length;
            var percent = download.total / download.size * 100;
            console.log('Downloaded: ' + percent.toFixed(2) + '% of ' + id);
        });

        stream.on('error', function() {
            console.log(err);
        });

        // Cache stream
        stream.pipe(fs.createWriteStream(cachefile));

        // Decode and play on speaker
        var speaker = null;
        var format = {};
        ffmpeg(stream)
            .on('codecData', function(data) {
                var channelStrToNum = {
                    'mono': 1,
                    'stereo': 2
                };

                var details = data.audio_details;
                speaker = new Speaker({
                    sampleRate: parseInt(details[1], 10),
                    channels: channelStrToNum[details[2]]
                });
            })
            .on('error', function(err) {
                console.log(err);
            })
            .format('s16le')
            .pipe()
            .on('data', function(chunk, enc) {
                if (!speaker) return console.log('Warning: Speaker uninitialized');
                speaker.write(chunk);
            })
    });
}

search('bohemian rhapsody', {
    maxResults: 5,
    key: config.youtubeKey
}, function(err, results) {
    if (err) return console.log(err);

    console.log(results);

    var videoResults = results.filter(function(result) {
        return result.kind == 'youtube#video';
    });

    var firstVideo = videoResults[0];
    if (!firstVideo) return console.log('No videos matched your search criteria');

    playYoutubeAudio(firstVideo.id);
});
