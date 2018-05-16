import { resolve } from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack'
// import resolvers from './webpack.resolve'

const base = {
  mode: 'production',
  plugins: [new HtmlWebpackPlugin()],

  entry: ['index.js'],

  resolve: {
    alias: {
      react: 'preact-compat',
      'react-dom': 'preact-compat',
      // Not necessary unless you consume a module using `createClass`
      // 'create-react-class': 'preact-compat/lib/create-react-class',
    },
    modules: ['node_modules', resolve(__dirname, 'src')],
    extensions: ['.js', '.json', '.jsx', '.css'],
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
        },
      },
    ],
  },
}

const development = {
  ...base,
  mode: 'development',
  plugins: [...base.plugins, new webpack.HotModuleReplacementPlugin()],

  entry: ['webpack-hot-middleware/client', ...base.entry],

  devtool: 'eval-source-map',
}

export default (() => {
  if (process.argv.includes('--mode=production')) return base

  return development
})()
