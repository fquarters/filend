import { useCallback } from "react"
import { batch, useSelector, useDispatch } from "react-redux"
import { patchSide } from "../store/action/action-creators"
import Selectors from "../store/data/selectors"

const useSideSwitch = () => {

    const activeSide = useSelector(Selectors.activeSideName)

    const dispatch = useDispatch()

    return useCallback(() => {

        batch(() => {

            dispatch(patchSide({
                side: activeSide,
                patch: {
                    active: false
                }
            }))
            dispatch(patchSide({
                side: activeSide === 'left' ? 'right' : 'left',
                patch: {
                    active: true
                }
            }))

        })

    }, [dispatch, activeSide])
}

export default useSideSwitch