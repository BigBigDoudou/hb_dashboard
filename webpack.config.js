const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  // ENTRY
  entry: './src/index.jsx',

  // OUTPUT
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    // publicPath: '/',
  },

  // PLUGINS
  plugins: [
    // create HTML file to serve the webpack bundle
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),
  ],

  // RESOLVE
  resolve: {
    extensions: ['.js', '.jsx'],
    // shorcuts for importing files
    alias: {
      src: path.resolve(__dirname, 'src'),
      components: path.resolve(__dirname, 'src/components/'),
      data: path.resolve(__dirname, 'src/data/'),
      helpers: path.resolve(__dirname, 'src/helpers/'),
      pages: path.resolve(__dirname, 'src/pages/'),
    },
  },

  // MODULE
  module: {
    rules: [
      // babel transpilation with babel-loader
      // https://github.com/babel/babel-loader
      {
        // compile .js and .jsx files
        test: /\.(js|jsx)$/,
        // do not compile librairies in nodes_modules
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              // compile ES6 down to ES5
              // https://babeljs.io/docs/en/babel-preset-env
              '@babel/preset-env',
              // compile JSX to Javascript
              // https://babeljs.io/docs/en/babel-preset-react
              '@babel/preset-react'
            ],
            plugins: [
              // https://babeljs.io/docs/en/babel-plugin-syntax-dynamic-import
              '@babel/plugin-syntax-dynamic-import',
              // https://babeljs.io/docs/en/babel-plugin-proposal-class-properties
              '@babel/plugin-proposal-class-properties'
            ],
          },
        },
      },
      {
        // Compile/Transpile to css
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            // resolve @import and url() inside CSS
            // https://github.com/webpack-contrib/css-loader
            loader: 'css-loader',
          },
          {
            // process CSS with PostCSS (autoprefixer, minifying...)
            // https://github.com/postcss/postcss-loader
            // add configs in postcss.config.js file
            loader: 'postcss-loader',
          },
          {
            // compile Sass/SCSS to CSS
            // https://github.com/webpack-contrib/sass-loader
            loader: 'sass-loader',
          },
          {
            // inject CSS into the DOM
            // https://github.com/webpack-contrib/style-loader
            loader: 'style-loader',
          },
        ],
      },
    ],
  },
};
