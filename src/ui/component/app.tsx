import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import useGlobalHotkeysBind from "../hook/use-global-hotkeys-bind";
import getInitInfoThunk from "../store/thunks/get-init-info";
import "./app.scss";
import FooterView from "./view/footer/footer-view";
import SideView from "./view/side-panel/side-view";

const App = () => {

    useGlobalHotkeysBind()

    const dispatch = useDispatch()

    useEffect(() => {

        dispatch(getInitInfoThunk())

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
        <div className={'app__footer'}>
            <FooterView />
        </div>
    </div>
};

export default App