const Promise = require('bluebird');
const cheerio = require('cheerio');
const chrono = require('chrono-node');
const request = require('request-promise');
const url = require('url');
const ytdl = require('ytdl-core');

function search(query, page) {
    const options = {
        url: 'https://www.youtube.com/results',
        qs: { q: query, sp: page },
    };

    return request(options)
        .then(scrape)
        .then(({ results, next }) => ({
            results,
            next: next ? () => search(query, next) : null
        }));
}

function scrape(html) {
    const results = [];

    const $ = cheerio.load(html);
    const content = $('#content');
    content.find('.yt-lockup-video:not(:has(.yt-badge-ad))').each((i, elem) => {
        const video = $(elem);
        results.push({
            id: video.data('context-item-id'),
            url: video.find('.yt-lockup-title a').attr('href'),
            title: video.find('.yt-lockup-title a').text(),
            by: {
                name: video.find('.yt-lockup-byline a').text(),
                url: video.find('.yt-lockup-byline a').attr('href'),
                verified: video.find('.yt-channel-title-icon-verified').length != 0
            },
            description: video.find('.yt-lockup-description').text(),
            duration: parseDuration(video.find('.video-time').text()),
            date: chrono.parseDate(video.find('.yt-lockup-meta li').eq(0).text()),
            views: parseInt(video.find('.yt-lockup-meta li').eq(1).text().replace(/,/g, '')),
            badges: video.find('.yt-badge').map((i, bage) => $(bage).text()).get(),

            // TODO: Figure out how to query missing thumbnails
            thumbnail: video.find('.yt-thumb-simple img').attr('src'),
        });
    });

    const nextPager = content
          .find('.search-pager')
          .find('a, button')
          .last();

    const next = nextPager.attr('href') ?
          url.parse(nextPager.attr('href'), true).query.sp :
          null;

    return { results, next };
}

function parseDuration(duration) {
    const [s = 0, m = 0, h = 0] = duration.split(':')
          .map((val) => parseInt(val, 10))
          .reverse();

    return s + m * 60 + h * 60;
}

module.exports = {
    search(query) {
        return search(query);
    },
    load(id) {
        const url = `https://www.youtube.com/watch?v=${encodeURIComponent(id)}`;
        return ytdl.getInfo(url).then(info => {
            const formats = info.formats;
            const audioFormats = formats.filter(format => {
                return format.type.indexOf('audio') != -1;
            });

            const format = audioFormats[0] || formats[0];
            return format.url;
        });
    },
};
