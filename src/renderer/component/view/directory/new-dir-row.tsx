import React, { useCallback, useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import useHotkeysToggle from "../../../hook/use-hotkeys-toggle"
import finishNewDirCreation from "../../../store/thunks/finish-new-dir-creation"

const defaultColumnCount = 4

const NewDirRow = () => {

    const inputRef = useRef<HTMLInputElement | null>(null)

    useEffect(() => {

        if (inputRef.current) {

            inputRef.current.focus()
        }
    }, [])

    const [disableHotkeys, enableHotkeys] = useHotkeysToggle()

    useEffect(() => {

        disableHotkeys()

        return () => {

            enableHotkeys()
        }
    }, [])

    const dispatch = useDispatch()
    const [value, setValue] = useState('')

    const handleKeyUp = useCallback((e: React.KeyboardEvent) => {

        if (e.key === "Enter") {

            dispatch(finishNewDirCreation(value))

        } else if (e.key === "Escape") {

            dispatch(finishNewDirCreation())
        }

    }, [dispatch, value])

    const updateValue = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {

        setValue(e.target.value)

    }, [])

    return <tr>
        <td colSpan={defaultColumnCount}>
            <input className="directory-view__new-dir-input"
                ref={inputRef}
                value={value}
                onChange={updateValue}
                onKeyUp={handleKeyUp} />
        </td>
    </tr>
}

export default NewDirRow