import { AnyAction } from "redux"
import { ThunkDispatch } from "redux-thunk"
import { Supplier } from "../../../../common/types"
import { patchMoveRequest } from "../action/action-creators"
import Selectors from "../data/selectors"
import { State } from "../data/state"

const createMoveRequest = () => (
    dispatch: ThunkDispatch<State, unknown, AnyAction>,
    getState: Supplier<State>
) => {

    const state = getState()

    const {
        side,
    } = Selectors.currentActiveState(state)

    const otherSide = side === 'left' ? 'right' : 'left'
    const otherTab = Selectors.activeTabOfSide(otherSide)(state)
    const selectedFiles = Selectors.selectedFilesOnActiveTab(state)

    if (selectedFiles.length) {

        const destination = selectedFiles.length === 1
            ? `${otherTab.path}/${selectedFiles[0].name}`
            : otherTab.path

        dispatch(patchMoveRequest({
            destination: destination,
            sources: selectedFiles
        }))
    }

}

export default createMoveRequest