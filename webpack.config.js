const path = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const childProcess = require('child_process');

const getRendererModuleRules = function () {
    return [
        {
            use: [
                'style-loader',
                'css-loader',
                'sass-loader'
            ],
            test: /\.scss$/
        },
        {
            test: /\.(ts|tsx)$/,
            loader: 'ts-loader',
            exclude: /node_modules/,
            options: {
                configFile: 'tsconfig.renderer.json'
            }
        },
        {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: [
                'file-loader',
            ],
        }
    ]
}

const getMainModuleRules = function () {
    return [
        {
            test: /\.(ts|tsx)$/,
            loader: 'ts-loader',
            exclude: /node_modules/,
            options: {
                configFile: 'tsconfig.main.json'
            }
        }
    ]
}

const getRendererEntry = () => path.resolve(__dirname, 'src/renderer/index.tsx');
const getMainEntry = () => path.resolve(__dirname, 'src/main/entry.ts');

const getRendererOutput = () => ({
    path: path.resolve(__dirname, './build'),
    filename: '[name].js'
});

const getMainOutput = () => ({
    path: path.resolve(__dirname, './build'),
    filename: 'entry.js'
});

const getVersion = function () {
    return childProcess.execSync('git rev-list HEAD --count').toString();
};

const htmlPluginConfig = new HtmlWebpackPlugin({
    hash: true,
    filename: path.resolve(__dirname, 'build/index.html'),
    template: path.resolve(__dirname, 'src/renderer/index.html')
});

module.exports = [
    {
        name: 'rendererDev',
        mode: 'development',
        entry: getRendererEntry(),
        output: getRendererOutput(),
        module: {
            rules: getRendererModuleRules()
        },
        devtool: 'eval-source-map',
        plugins: [
            htmlPluginConfig,
            new webpack.DefinePlugin({
                VERSION: JSON.stringify(getVersion()),
                MODE: JSON.stringify('DEVELOPMENT')
            })
        ],
        resolve: {
            extensions: ['.tsx', '.ts', '.js']
        },
        target: 'electron-renderer',
        watch: true
    },
    {
        name: 'rendererRelease',
        mode: 'production',
        entry: getRendererEntry(),
        output: getRendererOutput(),
        module: {
            rules: getRendererModuleRules()
        },
        devtool: false,
        plugins: [
            htmlPluginConfig,
            new webpack.DefinePlugin({
                VERSION: JSON.stringify(getVersion()),
                MODE: JSON.stringify('PRODUCTION')
            })
        ],
        target: 'electron-renderer',
        resolve: {
            extensions: ['.tsx', '.ts', '.js']
        }
    },
    {
        name: 'mainDev',
        mode: 'development',
        entry: getMainEntry(),
        output: getMainOutput(),
        module: {
            rules: getMainModuleRules()
        },
        devtool: false,
        plugins: [
            new webpack.DefinePlugin({
                VERSION: JSON.stringify(getVersion()),
                MODE: JSON.stringify('DEVELOPMENT')
            })
        ],
        target: 'electron-main',
        resolve: {
            extensions: ['.tsx', '.ts', '.js']
        }
    },
    {
        name: 'mainRelease',
        mode: 'production',
        entry: getMainEntry(),
        output: getMainOutput(),
        module: {
            rules: getMainModuleRules()
        },
        devtool: false,
        plugins: [
            new webpack.DefinePlugin({
                VERSION: JSON.stringify(getVersion()),
                MODE: JSON.stringify('PRODUCTION')
            })
        ],
        target: 'electron-main',
        resolve: {
            extensions: ['.tsx', '.ts', '.js']
        }
    }
];