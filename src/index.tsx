import React from 'react';
import ReactDOM from 'react-dom';
import Main from "./component/main";
import "bulma/css/bulma.css"

const root = document.getElementById('root');

if (root) {
    ReactDOM.render(<Main/>, root);
}

