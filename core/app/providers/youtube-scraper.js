const cheerio = require('cheerio');
const chrono = require('chrono-node');
const request = require('request-promise');
const url = require('url');
const ytdl = require('ytdl-core');

function search(query, page) {
    const options = {
        url: 'https://www.youtube.com/results',
        qs: {q: query, sp: page},
    };

    return request(options)
        .then(scrape)
        .then(({results, next}) => ({
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
        const title = video.find('.yt-lockup-title a');
        const by = video.find('.yt-lockup-byline a');
        const description = video.find('.yt-lockup-description');
        const duration = video.find('.video-time');
        const meta = video.find('.yt-lockup-meta li');
        const date = meta.eq(0);
        const views = meta.eq(1);
        const badges = video.find('.yt-badge');
        const thumbnail = video.find('.yt-thumb-simple img');
        results.push({
            id: video.data('context-item-id'),
            url: title.attr('href'),
            title: title.text(),
            by: {
                name: by.text(),
                url: by.attr('href'),
                verified: video.find('.yt-channel-title-icon-verified').length != 0
            },
            description: description.text(),
            thumbnail: thumbnail.data('thumb') || thumbnail.attr('src'),
            duration: parseDuration(duration.text()),
            date: chrono.parseDate(date.text()),
            views: parseInt(views.text().replace(/,/g, '')),
            badges: badges.map((i, bage) => $(bage).text()).get(),
        });
    });

    const nextPager = content
          .find('.search-pager')
          .find('a, button')
          .last();

    const next = nextPager.attr('href') ?
          url.parse(nextPager.attr('href'), true).query.sp :
          null;

    return {results, next};
}

function parseDuration(duration) {
    const [s = 0, m = 0, h = 0] = duration.split(':')
          .map((val) => parseInt(val, 10))
          .reverse();

    return s + m * 60 + h * 60;
}

module.exports = {
    search(query) {
        return search(query)
            .then(({results}) => results);
    },
    load(id) {
        const url = `https://www.youtube.com/watch?v=${encodeURIComponent(id)}`;
        return ytdl.getInfo(url, {filter: 'audio'})
            .then(info => info.formats[0].url);
    },
};
