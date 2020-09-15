import React, { CSSProperties, useEffect, MutableRefObject, useRef } from "react";
import { shallowEqual, useSelector, useDispatch, batch } from "react-redux";
import useAppInit from "../hook/use-app-init";
import useMouseDragTracking from "../hook/use-mouse-drag-tracking";
import Selectors from "../store/data/selectors";
import "./app.scss";
import FooterView from "./view/footer/footer-view";
import SideView from "./view/side-panel/side-view";
import { patchSide } from "../store/action/action-creators";

const dividerWidth = "0.5rem"

const getOverriddenTemplateColumns = (left: number | null): CSSProperties => {

    if (left) {
        return {
            gridTemplateColumns: `${left}px ${dividerWidth} auto`
        }
    }

    return {}
}

type DividerProps = {
    leftRef: MutableRefObject<HTMLDivElement | null>,
}

const Divider = ({
    leftRef
}: DividerProps) => {

    const {
        distance,
        moving,
        onMouseDown
    } = useMouseDragTracking()

    const dispatch = useDispatch()

    useEffect(() => {

        const leftSide = leftRef.current

        if (moving && distance?.x && leftSide) {

            dispatch(patchSide({
                side: 'left',
                patch: {
                    width: leftSide.offsetWidth + distance.x
                }
            }))
        }

    }, [distance, moving, dispatch, leftRef])

    return <div className={'app__divider'}
        onMouseDown={onMouseDown} />
}

const App = () => {

    useAppInit()

    const {
        left
    } = useSelector(Selectors.sidePanelWidths, shallowEqual)

    const leftRef = useRef<HTMLDivElement | null>(null)

    return <div className={'app'}
        style={getOverriddenTemplateColumns(left)}>
        <div className={'app__header'}></div>
        <div className={'app__side-panel'}
            ref={leftRef}>
            <SideView side={'left'} />
        </div>
        <Divider leftRef={leftRef} />
        <div className={'app__side-panel'}>
            <SideView side={'right'} />
        </div>
        <div className={'app__footer'}>
            <FooterView />
        </div>
    </div>
};

export default App