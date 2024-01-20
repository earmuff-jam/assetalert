const { useBabelRc, override, addWebpackPlugin } = require('customize-cra');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = override(useBabelRc(), addWebpackPlugin(new BundleAnalyzerPlugin()));
