import React, { useCallback } from "react"
import { useDispatch } from "react-redux"
import Button from "../../../component/button"
import copySelectedFiles from "../../store/thunks/copy-selected-files"
import createMoveRequest from "../../store/thunks/create-move-request"
import deleteSelectedFiles from "../../store/thunks/delete-selected-files"
import editFileInFocus from "../../store/thunks/edit-file-in-focus"
import initNewDirCreation from "../../store/thunks/init-new-dir-creation"
import viewFileInFocus from "../../store/thunks/view-file-in-focus"
import "./action-panel.scss"

const ActionPanel = () => {

    const dispatch = useDispatch()

    const onView = useCallback(() => {
        dispatch(viewFileInFocus())
    }, [dispatch])

    const onEdit = useCallback(() => {
        dispatch(editFileInFocus())
    }, [dispatch])

    const onCopy = useCallback(() => {
        dispatch(copySelectedFiles())
    }, [dispatch])

    const onMove = useCallback(() => {
        dispatch(createMoveRequest())
    }, [dispatch])

    const onNew = useCallback(() => {
        dispatch(initNewDirCreation())
    }, [dispatch])

    const onDelete = useCallback(() => {
        dispatch(deleteSelectedFiles())
    }, [dispatch])

    return <div className="action-panel">
        <Button onClick={onView}>F3 View</Button>
        <Button onClick={onEdit}>F4 Edit</Button>
        <Button onClick={onCopy}>F5 Copy</Button>
        <Button onClick={onMove}>F6 Move</Button>
        <Button onClick={onNew}>F7 New</Button>
        <Button onClick={onDelete}>F8 Delete</Button>
    </div>
}

export default ActionPanel