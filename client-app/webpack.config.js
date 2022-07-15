const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: {
    main: "./src/index.tsx"
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname + "/dist"),
    publicPath: '/'
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: "/node_modules",
        use: ["babel-loader"]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(jpeg|png|ico)$/,
        loader: "file-loader",
        options: {
          publicPath: "./", // prefix를 아웃풋 경로로 지정
          // name: "[name].[ext]?[hash]" // 파일명 형식
          name: "[name].[ext]"
        }
      },
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ]
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: "banner test"
    }),
    new HtmlWebPackPlugin({
      template: "./public/index.html",
      filename: "index.html",
      favicon: "./public/favicon.ico"
    }),
    new CleanWebpackPlugin()
  ],
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    },
    historyApiFallback: true,
    port: 3000,
    open: true,
    hot: true
  }
};
