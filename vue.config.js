/*
 * @Author: Du 
 * @Date: 2018-12-20 09:21:23 
 * @Last Modified by: Du
 * @Last Modified time: 2019-01-14 14:22:13
 */

// vue.config.js



const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')
const path = require('path')
const fs = require('fs')
const debug = process.env.NODE_ENV !== 'production'

let cesiumSource = './node_modules/cesium/Source'
let cesiumWorkers = '../Build/Cesium/Workers'

module.exports = {
    baseUrl: '',
    devServer: {
        port: 13000
    },
    configureWebpack: {
        output: {
            sourcePrefix: ' '
        },
        amd: {
            toUrlUndefined: true
        },
        resolve: {
            alias: {
                'vue$': 'vue/dist/vue.esm.js',
                '@': path.resolve('src'),
                'cesium': path.resolve(__dirname, cesiumSource)
            }
        },
        plugins: [
            new CopyWebpackPlugin([{
                from: path.join(cesiumSource, cesiumWorkers),
                to: 'Workers'
            }]),
            new CopyWebpackPlugin([{
                from: path.join(cesiumSource, 'Assets'),
                to: 'Assets'
            }]),
            new CopyWebpackPlugin([{
                from: path.join(cesiumSource, 'Widgets'),
                to: 'Widgets'
            }]),
            new CopyWebpackPlugin([{
                from: path.join(cesiumSource, 'ThirdParty/Workers'),
                to: 'ThirdParty/Workers'
            }]),
            new webpack.DefinePlugin({
                CESIUM_BASE_URL: JSON.stringify('./')
            })
        ],
        module: {
            unknownContextCritical: /^.\/.*$/,
            unknownContextCritical: false,
        }
    },
    css: {
        loaderOptions: {
            // 给 sass-loader 传递选项
            sass: {
                data: `@import "@/assets/variables.scss";`
            }
        }
    },
}