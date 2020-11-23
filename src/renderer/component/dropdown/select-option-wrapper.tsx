import React, { ReactChild, useRef, useCallback } from "react"
import { Consumer } from "../../../common/types"

const OptionContext = React.createContext<OptionContextType | null>(null)

export type OptionContextType = {
    index: number
}

type OptionWrapperProps = {
    children: ReactChild,
    setFocus: Consumer<number>,
    removeFocus: Consumer<number>,
    index: number
}

const OptionWrapper = ({
    index,
    setFocus,
    removeFocus,
    children
}: OptionWrapperProps) => {

    const mouseIn = useRef(false)

    const onMove = useCallback(() => {

        if (mouseIn.current) {

            setFocus(index)

        } else {

            removeFocus(index)
        }

    }, [index, setFocus, removeFocus])

    const onEnter = useCallback(() => mouseIn.current = true, [])
    const onLeave = useCallback(() => mouseIn.current = false, [])

    return <OptionContext.Provider value={{
        index
    }}>
        <div onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            onMouseMove={onMove}
        >
            {children}
        </div>
    </OptionContext.Provider>
}

export default OptionWrapper

export {
    OptionContext
}