import React, { useCallback, useEffect, useMemo } from "react"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import Strings from "../../../common/strings"
import Button from "../../../component/button"
import Modal from "../../../component/modal/modal"
import useLocale from "../../../hook/use-locale"
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

    const locale = useLocale()
    const stringProvider = useMemo(() => Strings.get(locale), [locale])

    const footer = useMemo(() => <React.Fragment>
        <Button onClick={onOk}>
            {stringProvider('yesButton')}
        </Button>
        <Button onClick={onCancel}>
            {stringProvider('cancelButton')}
        </Button>
    </React.Fragment>, [
        onCancel,
        onOk,
        stringProvider
    ])

    const visible = !!moveRequest.sources.length

    const { disableHotkeys, enableHotkeys } = useHotkeysToggle()

    useEffect(() => {

        if (visible) {

            disableHotkeys()

            return () => {

                enableHotkeys()
            }
        }

    }, [visible, disableHotkeys, enableHotkeys])

    return <Modal visible={visible}
        title={stringProvider('confirmDialogTitle')}
        footer={footer}>
        <div className="move-request-dialog">
            <div>
                {stringProvider('moveRequestDialogMessage')}
            </div>
            <div className="move-request-dialog__inputs">
                <div className="move-request-dialog__input-row">
                    <label>{stringProvider('moveToLabel')}:</label>
                    <input value={moveRequest.destination}
                        onChange={onDestinationChange} />
                </div>
            </div>
        </div>
    </Modal>
}

export default MoveRequestDialog