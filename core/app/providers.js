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
        } else {
            debug.log(debug.level.info, `Loading provider ${id}`);
            return true;
        }
    })

    // Load provider
    .map(([id, config]) => ({
        id, config,
        api: require(`./providers/${id}`),
    }))

    // Filter out providers that don't have the required methods
    .filter(({id, config, api}) => {
        const isValid = requiredMethods
            .reduce((isValid, method) => isValid && method in api, true);

        if (!isValid) {
            debug.log(debug.level.warning, `Skipping invalid provider ${id}`);
        }

        return isValid;
    })

    // Initialize provider
    .map(provider => {
        const {id, config, api} = provider;

        if ('init' in api) {
            debug.log(debug.level.info, `Initializing ${id}...`);
            api.init(config);
        }

        return provider;
    });

module.exports = {
    search(query) {
        return Promise.all(providers.map(provider => {
            return provider.api.search(query)
        })).then(results => {
            // Merge results from all providers
            return [].concat.apply([], allResults.map(({results}, i) => {
                const provider = providers[i].id;
                return results.map(result => {
                    result.provider = provider;
                    return result;
                });
            }));
        });
    },
    load(provider, id) {
        return providers.find(p => p === provider).api.load(id);
    }
};
