import { useContext, useLayoutEffect } from "react"
import { getModalRoot, modalBackdropClassname, modalBackdropVisibleClassname, modalRootClassname, modalRootVisibleClassname } from "./utils"
import { GlobalModalContext } from "./global-modal-access"

const useModalVisibility = (visible: boolean) => {

    const {
        activeModals,
        setActiveModals
    } = useContext(GlobalModalContext)!

    useLayoutEffect(() => {

        if (visible) {

            setActiveModals((current) => current + 1)

            return () => {

                setActiveModals((current) => current - 1)
            }
        }

    }, [visible, setActiveModals])

    useLayoutEffect(() => {

        console.log(activeModals)

        const root = getModalRoot()
        const backdrop = root.getElementsByClassName(modalBackdropClassname)[0]

        if (activeModals) {

            root.className = `${modalRootClassname} ${modalRootVisibleClassname}`
            backdrop.className = `${modalBackdropClassname} ${modalBackdropVisibleClassname}`

        } else {
            root.className = `${modalRootClassname}`
            backdrop.className = `${modalBackdropClassname}`
        }

    }, [activeModals])
}

export default useModalVisibility