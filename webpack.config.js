const path = require('path');

module.exports = {
    mode: 'development', // or 'production'
    entry: './assets/js/script.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        fallback: {
            stream: require.resolve('stream-browserify'),
            buffer: require.resolve('buffer/'),
            path: require.resolve('path-browserify'),
            os: require.resolve('os-browserify/browser'),
            crypto: require.resolve('crypto-browserify'),
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },
};
