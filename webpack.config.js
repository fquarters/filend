const path = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const childProcess = require('child_process');

const getModuleRules = function () {
    return [
        {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader'
            }
        },
        {
            use: [
                'style-loader',
                'css-loader'
            ],
            test: /\.css$/
        },
        {
            test: /\.(ts|tsx)$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }
    ]
};

const getEntry = () => path.resolve(__dirname, 'src/index.tsx');

const getOutput = dir => ({
    path: path.resolve(__dirname, dir),
    filename: '[name].js'
});

const getVersion = function () {
    return childProcess.execSync('git rev-list HEAD --count').toString();
};

module.exports = [
    {
        name: 'dev',
        mode: 'development',
        devServer: {
            contentBase: path.resolve(__dirname, './dist'),
            compress: true,
            port: 9001
        },
        entry: getEntry(),
        output: getOutput('./dist'),
        module: {
            rules: getModuleRules()
        },
        devtool: 'eval-source-map',
        plugins: [
            new HtmlWebpackPlugin({
                hash: true,
                filename: path.resolve(__dirname, 'dist/index.html'),
                template: path.resolve(__dirname, 'src/index.html')
            }),
            new webpack.DefinePlugin({
                CONTEXT_ROOT: JSON.stringify('http://localhost:8080'),
                VERSION: JSON.stringify(getVersion())
            })
        ],
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        }
    },
    {
        name: 'release',
        mode: 'production',
        entry: getEntry(),
        output: getOutput('../static'),
        module: {
            rules: getModuleRules()
        },
        devtool: 'source-map',
        plugins: [
            // new BundleAnalyzerPlugin(), // uncomment to analyze bundle content
            new webpack.DefinePlugin({
                CONTEXT_ROOT: JSON.stringify('http://localhost:8080'),
                VERSION: JSON.stringify(getVersion())
            })
        ],
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        }
    }
];