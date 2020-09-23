import { useState, useLayoutEffect } from "react"
import { getModalRoot } from "../common/modal"

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

export default useAppendModalContainer