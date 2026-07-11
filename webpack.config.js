const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: './src/index.tsx',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: isDev ? '[name].js' : '[name].[contenthash].js',
    chunkFilename: isDev ? '[name].chunk.js' : '[name].[contenthash].chunk.js',
    publicPath: '/',
    clean: true,
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.module\.scss$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: isDev
                  ? '[name]__[local]--[hash:base64:5]'
                  : '[hash:base64:6]',
              },
              sourceMap: isDev,
            },
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: isDev },
          },
        ],
      },
      {
        test: /\.scss$/,
        exclude: /\.module\.scss$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: isDev },
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: isDev },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { sourceMap: isDev } },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|ico)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name].[hash][ext]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name].[hash][ext]',
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: false,
    }),
    !isDev &&
      new MiniCssExtractPlugin({
        filename: 'styles/[name].[contenthash].css',
        chunkFilename: 'styles/[name].[contenthash].chunk.css',
      }),
  ].filter(Boolean),

  devServer: {
    port: 3000,
    hot: true,
    historyApiFallback: true,
    compress: true,
    open: false,
    static: {
      directory: path.resolve(__dirname, 'public'),
    },
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },

  devtool: isDev ? 'eval-source-map' : 'source-map',

  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },

  performance: {
    hints: isDev ? false : 'warning',
  },
};
