import { batch } from "react-redux"
import { AnyAction } from "redux"
import { ThunkDispatch } from "redux-thunk"
import Message from "../../../../common/ipc/message-creators"
import { RenameFileMessage } from "../../../../common/ipc/messages"
import { Supplier } from "../../../../common/types"
import { ipcInvoke } from "../../../common/ipc"
import { Locales } from "../../../common/locales"
import Strings from "../../../common/strings"
import { patchMoveRequest } from "../action/action-creators"
import Selectors from "../data/selectors"
import { State } from "../data/state"
import copyImpl from "./impl/copy-impl"
import deleteImpl from "./impl/delete-impl"
import updateTabDirInfo from "./update-tab-dir-info"

const getParentDirPath = (path: string) => path
    .replace('\\', '/')
    .split('/')
    .slice(0, -1)
    .join('/')

const moveFiles = () => async (
    dispatch: ThunkDispatch<State, unknown, AnyAction>,
    getState: Supplier<State>
) => {

    const state = getState()

    const otherSide = state.left.active ? 'right' : 'left'

    const {
        destination,
        sources
    } = Selectors.moveRequest(state)

    const clearRequest = () => dispatch(patchMoveRequest({
        destination: '',
        sources: []
    }))

    const invokeMove = async () => {

        await copyImpl({
            getTaskDescription: (locale: Locales) =>
                (args) => Strings.getTemplate(locale)('moveTaskDescription', args)
        })(dispatch, getState)

        await deleteImpl({
            askConfirm: false
        })(dispatch, getState)

        clearRequest()
    }

    if (sources.length === 1) {

        if (sources[0].path !== destination) {

            const destinationDir = getParentDirPath(destination)
            const sourceDir = getParentDirPath(sources[0].path)

            if (destinationDir === sourceDir || destination === sourceDir) {

                await ipcInvoke<void, RenameFileMessage>(Message.renameFile({
                    oldPath: sources[0].path,
                    newPath: destination
                }))

                batch(() => {

                    dispatch(updateTabDirInfo({
                        side: otherSide,
                        tab: state[otherSide].activeTab
                    }))
                    clearRequest()

                })

            } else {

                await invokeMove()
            }

        } else {

            clearRequest()
        }

    } else {

        await invokeMove()
    }

}

export default moveFiles