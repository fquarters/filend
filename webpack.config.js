const path = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const childProcess = require('child_process');
const CopyWebpackPlugin = require('copy-webpack-plugin');

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
        },
        {
            test: /\.node$/,
            loader: 'node-loader',
        }
    ]
}

const getRendererEntry = (name) => path.resolve(__dirname, `src/renderer/${name}.tsx`);
const getMainEntry = () => path.resolve(__dirname, 'src/main/entry.ts');

const getRendererOutput = (bundleName) => ({
    path: path.resolve(__dirname, './build'),
    filename: `${bundleName}.js`
});

const getMainOutput = () => ({
    path: path.resolve(__dirname, './build'),
    filename: 'entry.js'
});

const getVersion = function () {
    return childProcess.execSync('git rev-list HEAD --count').toString();
};

const getHtmlPluginConfig = (outputFile) => new HtmlWebpackPlugin({
    hash: true,
    filename: path.resolve(__dirname, `build/${outputFile}.html`),
    template: path.resolve(__dirname, 'src/renderer/index.html')
});

const getDefinePluginConfig = (mode) => new webpack.DefinePlugin({
    VERSION: JSON.stringify(getVersion()),
    MODE: JSON.stringify(mode)
})

const getRendererConfig = ({
    name,
    mode,
    entryName,
    watch,
    outputFile,
    MODE,
    bundleName
}) => ({
    name,
    mode,
    entry: getRendererEntry(entryName),
    output: getRendererOutput(bundleName),
    module: {
        rules: getRendererModuleRules()
    },
    devtool: 'eval-source-map',
    plugins: [
        getHtmlPluginConfig(outputFile),
        getDefinePluginConfig(MODE)
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    target: 'electron-renderer',
    watch
})

module.exports = [
    getRendererConfig({
        name: 'rendererDev',
        mode: 'development',
        MODE: 'DEVELOPMENT',
        watch: true,
        entryName: 'index',
        outputFile: 'index',
        bundleName: 'main'
    }),
    getRendererConfig({
        name: 'rendererRelease',
        mode: 'production',
        MODE: 'PRODUCTION',
        watch: false,
        entryName: 'index',
        outputFile: 'index',
        bundleName: 'main'
    }),
    getRendererConfig({
        name: 'viewerDev',
        mode: 'development',
        MODE: 'DEVELOPMENT',
        watch: true,
        entryName: 'viewer',
        outputFile: 'viewer',
        bundleName: 'viewer'
    }),
    getRendererConfig({
        name: 'viewerRelease',
        mode: 'production',
        MODE: 'PRODUCTION',
        watch: false,
        entryName: 'viewer',
        outputFile: 'viewer',
        bundleName: 'viewer'
    }),
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
            getDefinePluginConfig('DEVELOPMENT'),
            // TODO there should be a proper way to do this
            new CopyWebpackPlugin({
                patterns: [
                    { from: "./node_modules/drivelist/build" }
                ]
            })
        ],
        target: 'electron-main',
        resolve: {
            extensions: ['.tsx', '.ts', '.js']
        },

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
            getDefinePluginConfig('PRODUCTION')
        ],
        target: 'electron-main',
        resolve: {
            extensions: ['.tsx', '.ts', '.js']
        }
    }
];