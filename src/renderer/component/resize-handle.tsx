import React, { HTMLAttributes, useEffect, useLayoutEffect } from "react"
import { Consumer } from "../../common/types"
import useMouseDragTracking from "../hook/use-mouse-drag-tracking"
import "./resize-handle.scss"

type HandleAlignment = 'top' | 'right' | 'left' | 'bottom'

type ResizeHandleProps = {
    onResize: Consumer<number>,
    align: HandleAlignment
} & HTMLAttributes<HTMLSpanElement>

const ResizeHandle = ({
    align,
    onResize
}: ResizeHandleProps) => {

    const {
        distance,
        moving,
        onMouseDown
    } = useMouseDragTracking()

    useLayoutEffect(() => {

        if (moving && distance) {

            switch (align) {
                case 'left':
                    onResize(-distance.x)
                    break
                case 'right':
                    onResize(distance.x)
                    break
                case 'bottom':
                    onResize(-distance.y)
                    break
                case 'top':
                    onResize(distance.y)
                    break
            }
        }

    }, [onResize, distance, moving])

    return <span className={`resize-handle resize-handle--${align}`}
        onMouseDown={onMouseDown} />
}

export default ResizeHandle

export type {
    ResizeHandleProps
}