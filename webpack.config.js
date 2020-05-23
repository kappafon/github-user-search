const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "src", "index.tsx"),
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        include: path.join(__dirname, "src"),
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, "build"),
    historyApiFallback: true,
    compress: true,
    hot: true,
    port: 3000,
  },
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
  },
};
