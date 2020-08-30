import React from "react";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import configureStore from "../store/store-configuration";
import App from "./app";

export default () => {

    return <Provider store={configureStore()}>
            <HashRouter>
                <App />
            </HashRouter>
        </Provider>
}