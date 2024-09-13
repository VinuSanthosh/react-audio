const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
 
// require('dotenv').config({ path: __dirname + '/.env' });
 
module.exports = {
    mode: process.env.NODE_ENV || 'development',
    entry: './src/index.js',
    resolve: {
        fallback: {
            // "fs": false, // Use an empty module or a polyfill if needed
            "path": require.resolve("path-browserify") // Use a polyfill for the 'path' module
            // "path": false // Use a polyfill for the 'path' module
        }
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            favicon: './public/favicon.ico',
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
        new Dotenv(),
        // new Dotenv({ path: './.env' }),
    ],
    devServer: {
        static: './public',
        port: 3000,
        open: true,
        hot: true,
        historyApiFallback: true,
    },
};