import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default {
  context: path.resolve(__dirname),
  entry: "./example.tsx",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "example.bundle.js",
    path: path.resolve(__dirname, "public"),
  },
  devServer: {
    static: path.join(__dirname, "public"),
    compress: true,
    liveReload: true,
    open: true,
    port: 8080,
  },
};
