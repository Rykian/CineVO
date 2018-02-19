import { resolve } from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack'

const base = {
  mode: 'production',
  plugins: [
    new HtmlWebpackPlugin(),
  ],

  entry: ['index.js'],

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

const development = {
  ...base,
  mode: 'development',
  plugins: [
    ...base.plugins,
    new webpack.HotModuleReplacementPlugin(),
  ],

  entry: [
    'webpack-hot-middleware/client',
    ...base.entry,
  ],
}

export default (() => {
  if (process.argv.includes('--mode=production')) return base

  return development
})()
