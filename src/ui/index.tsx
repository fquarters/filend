import React from 'react';
import ReactDOM from 'react-dom';
import Main from "./component/main";
import Logger from 'js-logger';
import { replacingElement } from '../common/collections';

const root = document.getElementById('root');
Logger.useDefaults();

if (root) {

    ReactDOM.render(<Main />, root);
}

