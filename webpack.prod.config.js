const path = require('path');

module.exports = {
    entry: "./i.js",
    output: {
        path: path.resolve(__dirname),
        libraryTarget: "umd",
        filename: "./index.js",
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    }
};
