var p = require("path");var c={
    mode: "production",
    output: {
        path: p.resolve(__dirname)
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
},ic=Object.assign({entry:"./1/i.js"},c),oc=Object.assign({entry:"./1/o.js"},c),wc=Object.assign({entry:"./1/wb.js"},c);ic.output=Object.assign({filename:"index.js",libraryTarget:"umd"},c.output);oc.output=Object.assign({filename:"o.js",libraryTarget:"umd"},c.output);wc.output=Object.assign({filename:"w.js",libraryTarget:"var"},c.output);module.exports=[ic,oc,wc]
