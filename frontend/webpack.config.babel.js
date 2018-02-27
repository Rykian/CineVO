import { resolve } from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
// import RelayCompilerWebpackPlugin from 'relay-compiler-webpack-plugin'
import webpack from 'webpack'

const base = {
  mode: 'production',
  plugins: [
    new HtmlWebpackPlugin(),
    /* new RelayCompilerWebpackPlugin({
      schema: resolve(__dirname, '../backend/app/javascript/packs/schema.json'),
      src: resolve(__dirname, './src'),
    }), */
  ],

  entry: ['index.js'],

  resolve: {
    alias: {
      react: 'preact-compat',
      'react-dom': 'preact-compat',
      // Not necessary unless you consume a module using `createClass`
      // 'create-react-class': 'preact-compat/lib/create-react-class',
    },
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

  devtool: 'eval-source-map',
}

export default (() => {
  if (process.argv.includes('--mode=production')) return base

  return development
})()
