const path = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const childProcess = require('child_process');

const tsConfig = {
    configFile: 'tsconfig.ui.json'
}

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
            loader: 'ts-loader',
            exclude: /node_modules/,
            options: tsConfig
        }
    ]
};

const getEntry = () => path.resolve(__dirname, 'src/ui/index.tsx');

const getOutput = () => ({
    path: path.resolve(__dirname, './build'),
    filename: '[name].js'
});

const getVersion = function () {
    return childProcess.execSync('git rev-list HEAD --count').toString();
};

const htmlPluginConfig = new HtmlWebpackPlugin({
    hash: true,
    filename: path.resolve(__dirname, 'build/index.html'),
    template: path.resolve(__dirname, 'src/ui/index.html')
});

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
        output: getOutput(),
        module: {
            rules: getModuleRules()
        },
        devtool: 'eval-source-map',
        plugins: [
            htmlPluginConfig,
            new webpack.DefinePlugin({
                CONTEXT_ROOT: JSON.stringify('http://localhost:8080'),
                VERSION: JSON.stringify(getVersion())
            })
        ],
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        watch: true
    },
    {
        name: 'release',
        mode: 'production',
        entry: getEntry(),
        output: getOutput(),
        module: {
            rules: getModuleRules()
        },
        devtool: 'source-map',
        plugins: [
            htmlPluginConfig,
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