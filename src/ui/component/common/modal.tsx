import React, { CSSProperties, MutableRefObject, ReactChild, ReactChildren, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { Consumer } from "../../../common/types"
import "./modal.scss"

const modalRootId = "___modal-root"
const modalRootClassname = "modal"
const modalRootVisibleClassname = "modal--visible"
const modalBackdropClassname = "modal__backdrop"
const modalBackdropVisibleClassname = "modal__backdrop--visible"

let modalsCount = 0

const getModalRoot = (): HTMLElement => {

    const root = document.getElementById(modalRootId)
    if (!root) {

        const root = document.createElement('div')
        root.className = "modal"
        root.id = "___modal-root"

        const backdrop = document.createElement('div')
        backdrop.className = modalBackdropClassname

        root.appendChild(backdrop)
        document.body.appendChild(root)

        return root
    }

    return root
}

const useAppendModalContainer = (visible: boolean): HTMLDivElement | null => {

    const [container, setContainer] = useState<HTMLDivElement | null>(null)

    useLayoutEffect(() => {

        if (visible) {
            const root = getModalRoot()
            const div = document.createElement('div')
            div.className = "modal__container"

            setContainer(div)
            root.appendChild(div)

            return () => {

                setContainer(null)
                root.removeChild(div)
            }
        }

    }, [visible])

    return container
}

const useModalVisibility = (visible: boolean) => {

    useLayoutEffect(() => {

        const root = getModalRoot()
        const backdrop = root.getElementsByClassName(modalBackdropClassname)[0]

        if (visible) {
            modalsCount++
            root.className = `${modalRootClassname} ${modalRootVisibleClassname}`
            backdrop.className = `${modalBackdropClassname} ${modalBackdropVisibleClassname}`
        } else {
            modalsCount--

            if (!modalsCount) {
                root.className = `${modalRootClassname}`
                backdrop.className = `${modalBackdropClassname}`
            }
        }

    }, [visible])
}

type ModalProps = {
    children: ReactChildren | ReactChild,
    title: string,
    width?: number | string,
    footer?: JSX.Element,
    visible: boolean,
    dismissable?: boolean
    toggleVisibility?: Consumer<boolean>
}

type DismissHandlerArgs = {
    dialogRef: MutableRefObject<HTMLDivElement | null>
} & Pick<ModalProps, 'visible' | 'toggleVisibility' | 'dismissable'>

const useDismissHandler = ({
    toggleVisibility,
    visible,
    dialogRef,
    dismissable
}: DismissHandlerArgs) => {

    useEffect(() => {

        if (toggleVisibility && dismissable) {

            const dismiss = (e: MouseEvent) => {

                if (!e.target) {
                    return
                }

                if (dialogRef.current === e.target
                    || dialogRef.current?.contains(e.target as HTMLElement)) {

                    toggleVisibility(false)
                }
            }

            if (visible) {

                document.addEventListener('click', dismiss)
            }

            return () => document.removeEventListener('click', dismiss)
        }

    }, [toggleVisibility, visible, dialogRef, dismissable])
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