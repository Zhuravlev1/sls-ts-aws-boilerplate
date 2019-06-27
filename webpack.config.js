const path = require('path');
const slsw = require('serverless-webpack');
const webpack = require('webpack');

const sourceMapSupport = new webpack.BannerPlugin({
  banner: 'require("source-map-support").install();',
  raw: true,
  entryOnly: false
});

module.exports = {
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  entry: slsw.lib.entries,
  devtool: 'source-map',
  stats: 'errors-only', // 'verbose'
  resolve: {
    extensions: ['.js', '.json', '.ts'],
    symlinks: false
  },
  output: {
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
    pathinfo: false
  },
  target: 'node',
  externals: {},
  module: {
    rules: [
      // all files with a `.ts` extension will be handled by `ts-loader`
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: [
          path.resolve(__dirname, 'node_modules'),
          path.resolve(__dirname, 'tests')
        ],
        options: {
          // disable type checker - CI checks types before the deploy
          transpileOnly: true,
          experimentalWatchApi: true
        }
      }
    ]
  },
  plugins: [sourceMapSupport]
};
