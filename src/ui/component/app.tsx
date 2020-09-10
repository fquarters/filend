import Logger from "js-logger";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import useGlobalHotkeysBind from "../hook/use-global-hotkeys-bind";
import getInitInfo from "../store/thunks/get-init-info";
import "./app.css";
import SideView from "./view/side-panel/side-view";

Logger.useDefaults();

const App = () => {

    useGlobalHotkeysBind()

    const dispatch = useDispatch()

    useEffect(() => {

        dispatch(getInitInfo())

    }, [dispatch])

    return <div className={'app'}>
        <div className={'app__header'}></div>
        <div className={'app__side-panel'}>
            <SideView side={'left'} />
        </div>
        <div className={'app__divider'}></div>
        <div className={'app__side-panel'}>
            <SideView side={'right'} />
        </div>
        <div className={'app__footer'}></div>
    </div>
};

export default App