'use strict';

var webpack = require('webpack'),
    path = require('path'),
    widget = require('./package.json').name,
    jsPath = 'src/widget',
    jsEntry = widget + '.js',
    buildPath = 'build/' + widget + '/widget',
    buildFile = widget + '.js',
    VueLoaderPlugin = require('vue-loader/lib/plugin');

const WebpackShellPlugin = require('webpack-shell-plugin-next');

var CopyWebpackPlugin = require('copy-webpack-plugin')

var config = {
    target: 'web',
    entry: {
        app: path.join(__dirname, jsPath, jsEntry)
    },
    output: {
        libraryTarget: 'amd',
        path: path.resolve(__dirname, buildPath),
        publicPath: '',
        filename: buildFile
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: [':data-src']
                    }
                }
            },
            {
                test: /\.s[a|c]ss$/,
                use: [
                    "style-loader", // creates style nodes from JS strings
                    "css-loader", // translates CSS into CommonJS
                    "sass-loader" // compiles Sass to CSS, using Node Sass by default
                ]
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: "url-loader?limit=1024"
            },
        ]
    },
    externals: {
        dojoBaseDeclare: "dojo/_base/declare",
        widgetBase: "mxui/widget/_WidgetBase",
        dijitTemplatedMixin: "dijit/_TemplatedMixin",
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    mode: "development", // Change the mode do "production" before you go live! Don't forget!
    plugins: [
        // Change the plugin do "production" before you go live! Don't forget!
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"' // change to "production" when publishing your Mendix widget
            }
        }),
        new CopyWebpackPlugin([{
            from: './src/widget/template/*.html',
            to: 'template/' + widget + '.html'
        }]),

        new WebpackShellPlugin({
            onBuildStart: {
                scripts: ['npm run clean'],
                blocking: true,
                parallel: false
            },
            onBuildExit: {
                scripts: ['node package.xml.js && cd build && zip -r widget.mpk * && cp widget.mpk ./../mendix/widgets/ && echo Widget copied to /mendix/widgets. Re-run your Mendix project to see changes.'],
                blocking: true,
                parallel: false
            }
        }),
        new VueLoaderPlugin(),
    ]
};

module.exports = config;