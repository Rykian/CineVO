import { resolve } from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack'

export default {
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],

  entry: ['webpack-hot-middleware/client', 'index.js'],
  resolve: {
    modules: [
      'node_modules',
      resolve(__dirname, 'src'),
    ],
    extensions: ['.js', '.json', '.jsx', '.css'],
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' },
      },
    ],
  },
}
