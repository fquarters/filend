import React, { useMemo, useRef } from "react";
import { Provider } from "react-redux";
import GlobalModalAccess from "../../component/modal/global-modal-access";
import configureStore from "../store/store-configuration";
import App from "./app/app";
import GlobalContext, { GlobalContextType } from "./context/global-context";
import '../../main.scss';

export default () => {

    const executeInputRef = useRef<HTMLInputElement | null>(null)

    const globalContext = useMemo<GlobalContextType>(() => ({
        executeInputRef
    }), [])

    return <Provider store={configureStore()}>
        <GlobalContext.Provider value={globalContext}>
            <GlobalModalAccess>
                <App />
            </GlobalModalAccess>
        </GlobalContext.Provider>
    </Provider>
}