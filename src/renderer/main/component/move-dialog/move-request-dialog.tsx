import React, { useCallback, useEffect, useMemo } from "react"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import Strings from "../../../common/strings"
import Button from "../../../component/button"
import Modal from "../../../component/modal/modal"
import { patchMoveRequest } from "../../store/action/action-creators"
import Selectors from "../../store/data/selectors"
import moveFiles from "../../store/thunks/move-files"
import useHotkeysToggle from "../hook/use-hotkeys-toggle"
import "./move-request-dialog.scss"

const MoveRequestDialog = () => {

    const moveRequest = useSelector(Selectors.moveRequest, shallowEqual)
    const dispatch = useDispatch()

    const onDestinationChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {

        dispatch(patchMoveRequest({
            destination: e.target.value
        }))

    }, [dispatch])

    const onOk = useCallback(() => {

        dispatch(moveFiles())

     }, [dispatch])

    const onCancel = useCallback(() => {

        dispatch(patchMoveRequest({
            destination: '',
            sources: []
        }))

     }, [dispatch])



    const footer = useMemo(() => <React.Fragment>
        <Button onClick={onOk}>
            {Strings.get('yesButton')}
        </Button>
        <Button onClick={onCancel}>
            {Strings.get('cancelButton')}
        </Button>
    </React.Fragment>, [
        onCancel,
        onOk,
    ])

    const visible = !!moveRequest.sources.length

    const [disableHotkeys, enableHotkeys] = useHotkeysToggle()

    useEffect(() => {

        if (visible) {
            
            disableHotkeys()

            return () => {

                enableHotkeys()
            }
        }

    }, [visible, disableHotkeys, enableHotkeys])

    return <Modal visible={visible}
        title={Strings.get('confirmDialogTitle')}
        footer={footer}>
        <div className="move-request-dialog">
            <div>
                {Strings.get('moveRequestDialogMessage')}
            </div>
            <div className="move-request-dialog__inputs">
                <div className="move-request-dialog__input-row">
                    <label>{Strings.get('moveToLabel')}:</label>
                    <input value={moveRequest.destination}
                        onChange={onDestinationChange} />
                </div>
            </div>
        </div>
    </Modal>
}

export default MoveRequestDialog