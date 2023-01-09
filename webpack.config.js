const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./i.js",
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './index.html'
        })
    ]
};
