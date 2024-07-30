const webpack = require('webpack');

module.exports = function override(config, env) {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    fs: false,
    'node-fetch': false,
    string_decoder: false,
    crypto: false,
  };
  return config;
};
