const debug = require('./utils/debug');
const fs = require('fs');

const config = require('../../config.json');

// Methods which providers are required to implement
const requiredMethods = [
    'search',
    'load'
];

const providers = Object.entries(config.providers)

    // Filter out providers that aren't enabled
    .filter(([id, config]) => {
        if (!config.enabled) {
            debug.log(debug.level.warning, `Skipping disabled provider ${id}`);
            return false;
        }
    })

    // Load provider
    .map(([id, config]) => ({
        id, config,
        api: require(`./providers/${id}`),
    }))

    // Filter out providers that don't have the required methods
    .filter(({id, config, api}) => {
        let isValid = requiredMethods
            .reduce((isValid, method) => isValid && method in api, true);

        if (!isValid) {
            debug.log(debug.level.warning, `Skipping invalid provider ${id}`);
        }

        return isValid;
    })

    // Initialize provider
    .map(({id, config, api}) => {
        if ('init' in api) {
            debug.log(debug.level.info, `Initializing ${id}...`);
            api.init(config);
        }
    });

module.exports = {
    search(query) {
        return Promise.all(providers.map(provider => provider.api.search(query))).then(result => {
            return result.map((results, index) => ({
                provider: providers[index].id,
                results: results
            }));
        });
    },
    load(provider, id) {
        return providers.find(p => p.id === provider).api.load(id);
    }
};
