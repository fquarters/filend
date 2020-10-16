import React, { CSSProperties, ReactChild, ReactChildren, useMemo, useRef } from "react"
import { createPortal } from "react-dom"
import { Consumer } from "../../../common/types"

import "./modal.scss"
import useAppendModalContainer from "./use-append-modal-container"
import useDismissHandler from "./use-dismiss-handler"
import useModalVisibility from "./use-modal-visibility"

type ModalProps = {
    children: ReactChildren | ReactChild,
    title: string,
    width?: number | string,
    footer?: JSX.Element,
    visible: boolean,
    dismissable?: boolean
    toggleVisibility?: Consumer<boolean>
}

const Modal = ({
    children,
    title,
    width = 640,
    dismissable = false,
    footer,
    visible,
    toggleVisibility
}: ModalProps) => {

    const dialogRef = useRef<HTMLDivElement | null>(null)

    const container = useAppendModalContainer(visible)

    useModalVisibility(visible)

    useDismissHandler({
        visible,
        toggleVisibility,
        dismissable,
        dialogRef
    })

    const dialogStyle = useMemo<CSSProperties>(() => {

        return {
            width: typeof width === 'string' ? width : `${width}px`
        }

    }, [width])

    return container && createPortal(<React.Fragment>
        <div className="modal__dialog"
            ref={dialogRef}
            style={dialogStyle}>
            <div className="modal__header">
                {title}
            </div>
            <div className="modal__body">
                {children}
            </div>
            {footer && <div className="modal__footer">
                <div className="modal__footer-content">
                    {footer}
                </div>
            </div>}
        </div>
    </React.Fragment>, container)
}

export default Modal

export type {
    ModalProps
}
