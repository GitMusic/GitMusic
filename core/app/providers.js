const debug = require('./utils/debug');

const base = `${__dirname}/providers`;
const providers = require("fs").readdirSync(base).filter((provider) => {
    let functionality = require(`./providers/${provider.substr(0, provider.length - 3)}`);
    if ('search' in functionality && 'load' in functionality) {
        return true;
    }
    debug.log(debug.level.warning, `Skipping invalid provider ${provider}`);
    return false;
}).map(provider => ({
    source: provider.substr(0, provider.length - 3),
    functionality: require(`./providers/${provider.substr(0, provider.length - 3)}`),
}));

module.exports = {
    search(query) {
        return Promise.all(providers.map(provider =>
            provider.functionality.search(query)
        )).then((result => {
            return result.map((results, index) => ({
                provider: providers[index].source,
                results: results
            }));
        }));
    },
    load(source, song) {
        return providers.find(provider => source == source).functionality.load(song);
    }
};
