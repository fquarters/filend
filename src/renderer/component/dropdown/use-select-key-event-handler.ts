import React, { Dispatch, ReactChild, useCallback, useEffect } from "react"
import { BiConsumer, Consumer, MapFunction } from "../../../common/types"
import { SomeSelectAction } from "./use-select-reducer"

type SelectKeyEventHandlerHookArgs<T> = {
    dispatch: Dispatch<SomeSelectAction<T>>,
    onOptionSelect: Consumer<number>,
    focusedOption: number,
    optionCount: number,
    open: boolean
}

const useSelectKeyEventHandler = <T>({
    dispatch,
    onOptionSelect,
    focusedOption,
    optionCount,
    open
}: SelectKeyEventHandlerHookArgs<T>) => {
    const handler = useCallback((e: KeyboardEvent) => {

        if (e.key === "ArrowUp") {

            dispatch({
                type: "FOCUS_PREV_OPTION"
            })

            e.preventDefault()

        } else if (e.key === "ArrowDown") {


            dispatch({
                type: "FOCUS_NEXT_OPTION",
                data: optionCount
            })

            e.preventDefault()

        } else if (e.key === "Enter") {

            onOptionSelect(focusedOption)

        }

    }, [optionCount, focusedOption, onOptionSelect])

    useEffect(() => {

        if (open) {

            document.addEventListener('keydown', handler)

            return () => {
                document.removeEventListener('keydown', handler)
            }
        }

    }, [open, handler])
}

export default useSelectKeyEventHandler