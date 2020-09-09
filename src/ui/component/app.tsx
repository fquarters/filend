import Logger from "js-logger";
import React from "react";
import useGlobalHotkeysBind from "../hook/use-global-hotkeys-bind";
import SideView from "./view/side-view";
import "./app.css";

Logger.useDefaults();

const App = () => {

    useGlobalHotkeysBind()

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