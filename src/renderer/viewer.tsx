import Logger from 'js-logger';
import React from 'react';
import ReactDOM from 'react-dom';
import { first } from '../common/collections';
import { VIEWER_ID_ARG_NAME, VIEWER_PATH_ARG_NAME } from '../common/constants';
import { isProductionMode } from '../common/defined-values';
import ViewerApp from './viewer/component/viewer-app';

const root = document.getElementById('root')
Logger.useDefaults()

if (isProductionMode()) {

    Logger.setLevel(Logger.WARN)
}

const args = window.process.argv

const path = first(args, (arg) => arg.indexOf(VIEWER_PATH_ARG_NAME) >= 0)?.split('=')[1]
const id = first(args, (arg) => arg.indexOf(VIEWER_ID_ARG_NAME) >= 0)?.split('=')[1]

if (root && path && id) {

    ReactDOM.render(<ViewerApp id={id} path={path} />, root)
}

