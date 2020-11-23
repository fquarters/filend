import React, { useCallback, useEffect } from "react"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import Select from "../../../component/dropdown/select"
import SelectOption from "../../../component/dropdown/select-option"
import { patchDriveSelect } from "../../store/action/action-creators"
import Selectors from "../../store/data/selectors"
import { Side } from "../../store/data/state"
import "./drive-select.scss"

type DriveSelectProps = {
    side: Side,
}

const DriveSelect = ({
    side
}: DriveSelectProps) => {

    const {
        selecting,
        value
    } = useSelector(Selectors.sideDriveSelectState(side), shallowEqual)

    const mountpoints = useSelector(Selectors.mountpoints)

    const dispatch = useDispatch()

    const toggleOpenState = useCallback((open: boolean) => {

        dispatch(patchDriveSelect({
            side,
            patch: {
                selecting: open
            }
        }))

    }, [dispatch, side])

    const doOpen = useCallback(() => toggleOpenState(true), [toggleOpenState])
    const doClose = useCallback(() => toggleOpenState(false), [toggleOpenState])

    const onSelect = useCallback((value: string[]) => {

        dispatch(patchDriveSelect({
            side,
            patch: {
                selecting: false,
                value: value[0]
            }
        }))

    }, [dispatch, side])

    useEffect(() => {

        if (selecting) {

            const otherSide = side == 'left' ? 'right' : 'left'

            dispatch(patchDriveSelect({
                side: otherSide,
                patch: {
                    selecting: false
                }
            }))
        }

    }, [side, selecting])

    return <div className="drive-select">
        <Select open={selecting}
            value={[value]}
            onSelect={onSelect}
            onOutsideClick={doClose}
            onTriggerClick={doOpen}>
            {
                mountpoints.map((value, index) => <SelectOption value={value} key={index}>
                    {value}
                </SelectOption>)
            }
        </Select>
    </div>
}

export default DriveSelect