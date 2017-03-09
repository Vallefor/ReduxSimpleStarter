require('dotenv').config();
var path = require('path');
var webpack = require('webpack');
var CompressionPlugin = require("compression-webpack-plugin");
var StatsPlugin = require('stats-webpack-plugin');

//var StatsPlugin = require('stats-webpack-plugin');

var devServerPort = 3808;
var production = process.env.NODE_ENV === 'production';
var serverIp = process.env.SERVER_IP ? process.env.SERVER_IP : '//0.0.0.0:';

var config = {
  entry: [
    './src/index.js'
  ],
  output: {
    publicPath: '/',
    path: path.join(__dirname, '.', 'public', 'webpack'),
    //filename: '/webpack/bundle.js',
    filename: production ? '[name]-[chunkhash].js' : '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel?presets[]=react,presets[]=es2015,presets[]=stage-0"
      },
      {
        test: /\.(es6|js)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel?presets[]=es2015,presets[]=stage-0"
      },
      {
        test: /\.(json)$/,
        loader: "json-loader"
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      {
        test: /\.(scss|sass)$/,
        loaders: [
          'style',
          'css?modules,localIdentName=' +
          (production ?
            '[hash:base64:5]' :
            '[path][name]--[local]--[hash:base64:5]'),
          'sass'
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    //contentBase: '/'
  },
  plugins: [
    // must match config.webpack.manifest_filename
    new StatsPlugin('manifest.json', {
      // We only need assetsByChunkName
      chunkModules: false,
      source: false,
      chunks: false,
      modules: false,
      assets: true
    }),

    new webpack.ProvidePlugin({
      $: 'jquery'
    }),

    new CompressionPlugin({
        asset: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.js$|\.html$/,
        threshold: 10240,
        minRatio: 0.8
    })
  ]
};

if (production) {
  config.plugins.push(
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: { warnings: false },
      sourceMap: false
    }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('production') }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin()
  );
} else {
  config.devServer = {
    compress: true,
    port: devServerPort,
    historyApiFallback: true,
    headers: { 'Access-Control-Allow-Origin': '*' }
  };
  config.output.publicPath = serverIp + devServerPort + '/webpack/';
  // Source maps
  config.devtool = 'cheap-module-eval-source-map';
}

module.exports=config;