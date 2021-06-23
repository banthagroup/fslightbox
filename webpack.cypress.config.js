require('dotenv').config();
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./tests/__tests-services__/cypress/test-app.js",
    devServer: {
        host: process.env.CYPRESS_HOST,
        port: process.env.CYPRESS_PORT
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin()
    ]
};
