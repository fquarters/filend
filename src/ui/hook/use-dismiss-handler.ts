import { MutableRefObject, useEffect } from "react"
import { ModalProps } from "../component/common/modal"

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

export default useDismissHandler