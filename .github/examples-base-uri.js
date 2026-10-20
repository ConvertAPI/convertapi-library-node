// Preloaded by CI before the examples (node --require): the examples call require('../lib')(token)
// against the production API, so this points every client they create at CONVERT_API_BASE_URI instead.
const lib = require.resolve('../lib');
const ConvertAPI = require(lib);

if (process.env.CONVERT_API_BASE_URI) {
  require.cache[lib].exports = (credentials, options = {}) => ConvertAPI(
    credentials,
    Object.assign({ baseUri: process.env.CONVERT_API_BASE_URI }, options),
  );
}
