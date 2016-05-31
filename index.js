var fs = require('fs');
var search = require('youtube-search');
var ytdl = require('ytdl-core');
var ffmpeg = require('fluent-ffmpeg');

var config = require('./config.json');

function getYoutubeStream(id, callback) {
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
        }), format);
    });
}

search('the wheels on the bus', {
    maxResults: 5,
    key: config.key
}, function(err, results) {
    if (err) return console.log(err);

    console.log(results);

    var videoResults = results.filter(function(result) {
        return result.kind == 'youtube#video';
    });

    var firstVideo = videoResults[0];
    if (!firstVideo) return console.log('No videos matched your search criteria');

    getYoutubeStream(firstVideo.id, function(err, stream, format) {
        if (err) return console.log(err);

        ffmpeg(stream)
            .on('start', function() {
                console.log('Started converting audio:', format.type);
            })
            .on('end', function() {
                console.log('Finished converting');
            })
            .on('error', function(err) {
                console.log(err);
            })
            .save('audio.wav');
    });
});
