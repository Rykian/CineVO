import { resolve } from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const base = {
  mode: 'production',
  plugins: [new HtmlWebpackPlugin()],
  output: { publicPath: '/' },

  entry: ['index.js'],

  resolve: {
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
  devtool: 'eval-source-map',
}

export default (() => {
  if (process.argv.includes('--mode=production')) return base

  return development
})()
