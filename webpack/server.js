const { resolve } = require('path');
const {
  DefinePlugin,
  SourceMapDevToolPlugin,
  LoaderOptionsPlugin,
  optimize: {
    OccurenceOrderPlugin,
    UglifyJsPlugin,
  },
} = require('webpack');
const { smart, smartStrategy } = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const ReloadServerPlugin = require('reload-server-webpack-plugin');

const { stringify } = JSON;

const { env: { NODE_ENV } } = process;

const server = {
  target: 'node',
  context: resolve('src'),
  entry: {
    server: './server',
  },
  output: {
    path: resolve('build'),
    filename: '[name].js',
    sourceMapFilename: '[name].js.map',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  externals: [nodeExternals()],
  plugins: [
    new DefinePlugin({
      process: {
        env: {
          NODE_ENV: stringify(NODE_ENV),
        },
      },
    }),
    new SourceMapDevToolPlugin(),
  ],
};

if (NODE_ENV === 'development') {
  module.exports = smartStrategy({
    'entry.packages': 'prepend',
  })(server, {
    plugins: [
      new ReloadServerPlugin({
        script: 'build/server.js',
      }),
      new LoaderOptionsPlugin({
        options: {
          eslint: {
            failOnWarning: false,
            failOnError: false,
            fix: false,
            quiet: false,
          },
        },
      }),
    ],
    output: {
      pathinfo: true,
    },
  });
}

if (NODE_ENV === 'production') {
  module.exports = smart(server, {
    plugins: [
      new OccurenceOrderPlugin(),
      new UglifyJsPlugin({
        compress: { warnings: false },
        comments: false,
        sourceMap: true,
        mangle: true,
        minimize: true,
      }),
    ],
  });
}
