import Logger from "js-logger";
import React, { useCallback, SyntheticEvent, useContext, useEffect } from "react";
import { Column, Row } from "./common/bulma-wrappers";
import SideView from "./view/side-view";
import SideContext from "./context/side-context";
import { useDispatch, batch, useSelector } from "react-redux";
import { patchSide } from "../store/action/action-creators";
import Selectors from "../store/data/selectors";
import { Side } from "../store/data/state";
import useSideSwitch from "../hook/use-side-switch";

Logger.useDefaults();

const App = () => {

    const switchSide = useSideSwitch()

    const onKeyUp = useCallback((e: KeyboardEvent) => {

        if (e.key === "Tab") {

           switchSide()
        }

    }, [switchSide])

    useEffect(() => {

        document.addEventListener('keyup', onKeyUp)

        return () => document.removeEventListener('keyup', onKeyUp)

    }, [onKeyUp])

    return <div className={'content mx-2'}>
        <Row>
            <Column size={6}>
                <SideView side={'left'} />
            </Column>
            <Column size={6}>
                <SideView side={'right'} />
            </Column>
        </Row>
    </div>
};

export default App