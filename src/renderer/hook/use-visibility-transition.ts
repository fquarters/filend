import { useState, useLayoutEffect } from "react"

type VisiblityTransitionArgs = {
    hiddenByDefault?: boolean,
    hiddenClass: string,
    visibleClass: string,
    fadingInClass: string,
    fadingOutClass: string,
    visible: boolean
}

const useVisiblityTransition = ({
    hiddenByDefault = true,
    hiddenClass,
    visibleClass,
    fadingInClass,
    fadingOutClass,
    visible
}: VisiblityTransitionArgs) => {

    const [extraClasses, setExtraClasses] = useState(hiddenByDefault? hiddenClass : visibleClass)

    useLayoutEffect(() => {

        if (!visible) {

            setExtraClasses(fadingOutClass)

            const timeout = setTimeout(() => {

                setExtraClasses(hiddenClass)

            }, 400)

            return () => {
                clearTimeout(timeout)
            }

        } else {

            setExtraClasses(fadingInClass)

            const timeout = setTimeout(() => {

                setExtraClasses(visibleClass)

            }, 1)

            return () => {
                clearTimeout(timeout)
            }
        }

    }, [visible, hiddenClass, visibleClass, fadingInClass, fadingOutClass])

    return extraClasses
}

export default useVisiblityTransition