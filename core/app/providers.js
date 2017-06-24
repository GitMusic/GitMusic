const debug = require('./utils/debug');
const fs = require('fs');

const providers = fs.readdirSync(`${__dirname}/providers`)
      .map((provider) => {
          return {
              id: provider.substr(0, provider.length - 3),
              api: require(`./providers/${provider}`),
          }
      })
      .filter(({ id, api }) => {
          const requiredMethods = [
              'search',
              'load',
          ];

          const isValid = requiredMethods
                .reduce((isValid, method) => isValid && method in api, true);

          if (!isValid) {
              debug.log(debug.level.warning, `Skipping invalid provider ${id}`);
          }

          return isValid;
      });

module.exports = {
    search(query) {
        return Promise.all(providers.map((provider) => {
            return provider.api.search(query)
        })).then((allResults) => {
            // Merge the results from all sources and attach the
            // provider to each result id
            // NOTE: I am not sure this is how we want to handle
            // search results
            return [].concat.apply([], allResults.map(({ results }, i) => {
                const provider = providers[i].id;
                return results.map((result) => {
                    result.id = { provider, id: result.id };
                    return result;
                });
            }));
        });
    },
    load({ provider, id }) {
        return providers.find((provider) => provider === provider).api.load(id);
    }
};
