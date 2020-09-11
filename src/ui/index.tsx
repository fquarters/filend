import React from 'react';
import ReactDOM from 'react-dom';
import Main from "./component/main";
import Logger from 'js-logger';

const root = document.getElementById('root');
Logger.useDefaults();

if (root) {

    ReactDOM.render(<Main />, root);
}

