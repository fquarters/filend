import React, { useCallback, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import useHotkeysToggle from "../../../hook/use-hotkeys-toggle"
import { Side } from "../../../store/data/state"
import openDirInCurrentTab from "../../../store/thunks/open-dir-in-current-tab"

type PathInputProps = {
    value: string,
    side: Side
}

const PathInput = ({
    value,
    side
}: PathInputProps) => {

    const [innerValue, setInnerValue] = useState(value)
    const [editing, setEditing] = useState(false)

    useEffect(() => {

        setInnerValue(value)

    }, [value])

    const displayValue = editing ? innerValue : value

    const startEdit = useCallback(() => setEditing(true), [])
    const cancelEdit = useCallback(() => setEditing(false), [])

    const dispatch = useDispatch()

    const applyChanges = useCallback((e: React.KeyboardEvent) => {

        if (e.key === "Enter") {

            setEditing(false)
            dispatch(openDirInCurrentTab(innerValue))

            setInnerValue(value)
        }

    }, [side, dispatch, innerValue, value])

    const [disableHotkeys, enableHotkeys] = useHotkeysToggle()

    useEffect(() => {

        if (editing) {

            disableHotkeys()

            return () => {
                enableHotkeys()
            }
        }

    }, [disableHotkeys, enableHotkeys, editing])

    const updateInnerValue = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {

        setInnerValue(e.target.value)

    }, [])

    return <input value={displayValue}
        readOnly={!editing}
        onDoubleClick={startEdit}
        onBlur={cancelEdit}
        onKeyUp={applyChanges}
        onChange={updateInnerValue} />
}

export default PathInput