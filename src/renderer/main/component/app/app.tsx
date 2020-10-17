import React, { CSSProperties, MutableRefObject, useLayoutEffect, useRef } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import useMouseDragTracking from "../../../hook/use-mouse-drag-tracking";
import { patchSide } from "../../store/action/action-creators";
import Selectors from "../../store/data/selectors";
import FooterView from "../footer/footer-view";
import TaskCarouselView from "../header/task-carousel-view";
import MoveRequestDialog from "../move-dialog/move-request-dialog";
import SideView from "../side-panel/side-view";
import "./app.scss";
import useAppInit from "./use-app-init";

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

    useLayoutEffect(() => {

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
        <MoveRequestDialog />
        <div className={'app__header'}>
            <TaskCarouselView />
        </div>
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