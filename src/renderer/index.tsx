import React from 'react';
import ReactDOM from 'react-dom';
import Main from "./component/main";
import Logger from 'js-logger';
import { isProductionMode } from '../common/defined-values';

const root = document.getElementById('root')
Logger.useDefaults()

if (isProductionMode()) {

    Logger.setLevel(Logger.WARN)
}

if (root) {

    ReactDOM.render(<Main />, root)
}

