import { useLayoutEffect, useState } from "react"
import { getModalRoot, modalBackdropClassname, modalRootClassname, modalRootVisibleClassname, modalBackdropVisibleClassname } from "../common/modal"

const useModalVisibility = (visible: boolean) => {

    const [modalsCount, setModalsCount] = useState(0)

    useLayoutEffect(() => {

        const root = getModalRoot()
        const backdrop = root.getElementsByClassName(modalBackdropClassname)[0]

        if (visible) {

            setModalsCount((current) => current + 1)

            root.className = `${modalRootClassname} ${modalRootVisibleClassname}`
            backdrop.className = `${modalBackdropClassname} ${modalBackdropVisibleClassname}`

        } else {

            setModalsCount((current) => current - 1)


        }

    }, [visible])

    useLayoutEffect(() => {

        const root = getModalRoot()
        const backdrop = root.getElementsByClassName(modalBackdropClassname)[0]

        if (!modalsCount) {
            root.className = `${modalRootClassname}`
            backdrop.className = `${modalBackdropClassname}`
        }

    }, [modalsCount])
}

export default useModalVisibility