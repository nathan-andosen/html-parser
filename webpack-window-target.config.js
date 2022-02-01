var webpack = require("webpack");
var path = require('path');
var version = require('./package.json').version;

var banner = 'Html-Parser v' + version + '\n' +
  '(c) ' + new Date().getFullYear() + ' Nathan Anderson';

module.exports = {
  entry: {
    "Thenja" : "./src/index.ts"
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: (process.env.NODE_ENV === 'production')
      ? "thenja-html-parser-window.min.js" : "thenja-html-parser-window.js",
    library : "window.Thenja = window.Thenja || {}, window.Thenja.HtmlParser",
    libraryTarget: 'assign'
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      { test: /\.ts(x?)$/, loader: 'ts-loader' }
    ]
  },
  optimization: {
    minimize: false
  }
};


if (process.env.NODE_ENV === 'production') {
  module.exports.plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.BannerPlugin(banner),
    new webpack.optimize.OccurrenceOrderPlugin()
  ];
  module.exports.optimization.minimize = true;
} else {
  module.exports.devtool = '#source-map'
}
