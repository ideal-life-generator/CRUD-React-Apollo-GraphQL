const { resolve } = require('path');
const {
  DefinePlugin,
  HotModuleReplacementPlugin,
  SourceMapDevToolPlugin,
  LoaderOptionsPlugin,
  optimize: {
    CommonsChunkPlugin,
    OccurenceOrderPlugin,
    UglifyJsPlugin,
  },
} = require('webpack');
const { smart, smartStrategy } = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const { stringify } = JSON;

const { env: { NODE_ENV } } = process;

const client = {
  target: 'web',
  context: resolve('src'),
  entry: {
    packages: [
      'react',
    ],
    client: './index',
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
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: true,
              modules: true,
              localIdentName: '[name]_[local]_[hash:base64:5]',
            },
          },
          // {
          //   loader: 'autoprefixer-loader',
          //   options: {
          //     browsers: 'last 2 version',
          //   },
          // },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|otf|eot|woff|ttf|svg)$/,
        use: 'file-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new DefinePlugin({
      process: {
        env: {
          NODE_ENV: stringify(NODE_ENV),
        },
      },
    }),
    new CommonsChunkPlugin('packages'),
    new SourceMapDevToolPlugin({
      include: 'client',
      exclude: 'packages',
    }),
    new CopyWebpackPlugin([
      { from: 'index.html', to: 'index.html' },
    ]),
  ],
};

if (NODE_ENV === 'development') {
  module.exports = smartStrategy({
    'entry.packages': 'prepend',
  })(client, {
    entry: {
      packages: [
        'react-hot-loader/patch',
        'redux-devtools-instrument',
      ],
    },
    plugins: [
      new HotModuleReplacementPlugin(),
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
    devServer: {
      port: 3000,
      hot: true,
      inline: true,
      historyApiFallback: true,
      publicPath: client.output.publicPath,
    },
  });
}

if (NODE_ENV === 'production') {
  module.exports = smart(client, {
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
