const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: "development",
  devtool: "source-map",
  entry: path.resolve(__dirname, "./app.js"),
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.ejs$/,
        use: ["html-loader",
          { loader: "ejs-loader",
            options: {
              esModule: false,
            }}],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /simudp/,
        use: ["null-loader"]
      },
    ]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  resolve: {
    extensions: [".js", ".ejs", ".json"],
    fallback: {
      "stream": require.resolve("stream-browserify"),
      "util": require.resolve("util"),
      "path": require.resolve("path-browserify"),
      "fs": false,
      "url": require.resolve("url"),
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      'buffer': require.resolve('buffer/'),
      'zlib': require.resolve('browserify-zlib'),
      'querystring': require.resolve('querystring-es3'),
      'crypto': require.resolve('crypto-browserify'),
      'os': require.resolve('os-browserify/browser'),
      'net': false,
      "dgram": require.resolve("dgram-browserify")
    }
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist")
    }
  },
};
