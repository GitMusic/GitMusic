const ytsearch = require('youtube-search');
const ytdl = require('ytdl-core');

let settings;

module.exports = {
    init(config) {
        settings = config;
    },
    search(query) {
        return ytsearch(query, {
            maxResults: 5,
            key: settings.key
        }).then(({results}) => results
            .filter(result => result.kind == 'youtube#video')
            .map(video => ({id: video.id, title: video.title})));
    },
    load(id) {
        const url = `https://www.youtube.com/watch?v=${encodeURIComponent(id)}`;
        return ytdl.getInfo(url, {filter: 'audio'})
            .then(info => info.formats[0].url);
    },
};
