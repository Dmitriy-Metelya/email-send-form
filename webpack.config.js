import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import webpack from 'webpack';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  entry: {
    main: resolve(__dirname, './src/index.jsx'),
  },
  mode: 'development',
  devServer: {
    historyApiFallback: true,
    contentBase: resolve(__dirname, './dist'),
    open: true,
    compress: true,
    hot: true,
    port: 8080,
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  output: {
    path: resolve(__dirname, './dist'),
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};
