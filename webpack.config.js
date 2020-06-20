const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const autoprefixer = require("autoprefixer");
const webpack = require("webpack");


module.exports = {
    entry: {
        home: "./src/js/home/index.js",
        res: "./src/js/reservation/res_index.js"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[contenthash].bundle.js"
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        port: 9000,
        watchContentBase: true
    },
    // optimization: {
    //     runtimeChunk: "single",
    //     splitChunks: {
    //         chunks: 'all',
    //     },
    // },

    // optimization: {
    //     runtimeChunk: {
    //         name: 'runtime'
    //     }
    // },

    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/index.html",
            chunks: ["home"]

        }),
        new HtmlWebpackPlugin({
            filename: "seatsReservation.html",
            template: "./src/seatsReservation.html",
            chunks: ["res"]
        }),

        new CleanWebpackPlugin(),
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 9100,
            proxy: 'http://localhost:9000' //powinno sie zgadzać z dev serverport
        }, {
            reload: false
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [
                    autoprefixer()
                ]
            }
        })
    ],
    module: {
        rules: [{
                test: /\.scss$/, //what loaders should be applied
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                    "postcss-loader"
                ] //dopisanie komponentu

                // use: [{
                //         loader: "style-loader/url"
                //     },
                //     {
                //         loader: "file-loader",
                //         options: {
                //             name: "[name].[ext]"
                //         }
                //     }
                // ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]"
                    }
                }
            },
            {
                test: /\.(html)$/,
                use: ["html-loader"]
            },
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader'
            },
            {
                test: /\.txt$/i,
                use: 'raw-loader',
            }
            // {
            //     test: /\.(html)$/,
            //     use: [{
            //         loader: "file-loader",
            //         options: {
            //             name: "[name].[ext]",
            //         }
            //     }],
            //     exclude: path.resolve(__dirname, "src/index.html"),
            // }

        ]
    }
}