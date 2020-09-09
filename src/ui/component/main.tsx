import React from "react";
import { Provider } from "react-redux";
import configureStore from "../store/store-configuration";
import App from "./app";
import './main.css';

export default () => {

    return <Provider store={configureStore()}>
                <App />
        </Provider>
}