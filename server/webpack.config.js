const path = require('path');

module.exports = {
    entry: './src/main/js/app.js',
    devtool: 'inline-source-map',
    cache: true,
    mode: 'development',
    output: {
        path: __dirname, filename: './target/classes/static/js/bundle.js'
    },
    module: {
        rules: [{
            test: path.join(__dirname, '.'), exclude: /(node_modules)/, use: [{
                loader: 'babel-loader', options: {
                    presets: ["@babel/preset-env", "@babel/preset-react"]
                }
            }]
        }]
    }
};
