const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, './src/main/js/index'),
    mode: 'development',
    devtool: 'inline-source-map',
    cache: false,
    module: {
        rules: [{
            test: path.join(__dirname, '.'),
            exclude: /(node_modules)/,
            use: [{
                loader: 'babel-loader', options: {
                    presets: ["@babel/preset-env", "@babel/preset-react"]
                }
            }]
        }]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    output: {
        path: __dirname, filename: './target/classes/static/js/bundle.js'
    }
};
