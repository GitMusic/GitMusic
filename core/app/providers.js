const debug = require('./utils/debug');
const fs = require('fs');
const config = require('../../config.json').providers;


//Methods which providers are required to implement
const requiredMethods = [
    'search',
    'load'
];

const providers = fs.readdirSync(`${__dirname}/providers`)
    .map(provider => provider.substr(0, provider.length - 3))
    .filter(provider => {
        let isValid = config[provider];
        if (!isValid) {
            debug.log(debug.level.warning, `Skipping provider ${provider}... Config was missing`);
        }

        if (!config[provider].enabled) {
            debug.log(debug.level.warning, `Skipping disabled provider ${provider}`);
            isValid = false;
        }
        return isValid;
    })
    .map(provider => {
      return {
          id: provider,
          api: require(`./providers/${provider}`)
      }
    })
    .filter(({ id, api }) => {
      let isValid = requiredMethods
            .reduce((isValid, method) => isValid && method in api, true);

      if (!isValid) {
          debug.log(debug.level.warning, `Skipping invalid provider ${id}`);
      }

      if ('init' in api) {
          debug.log(debug.level.info, `Initializing ${id}...`);
          api.init(config[id]);
      }

      return isValid;
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
