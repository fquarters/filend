import { batch } from "react-redux"
import { AnyAction } from "redux"
import { ThunkDispatch } from "redux-thunk"
import { difference } from "../../../../common/collections"
import { Supplier } from "../../../../common/types"
import { patchRoot } from "../action/action-creators"
import { State } from "../data/state"

const removeTask = (id: string) => (
    dispatch: ThunkDispatch<State, unknown, AnyAction>,
    getState: Supplier<State>
) => {

    const state = getState()

    const tasks = state.tasks

    batch(() => {

        dispatch(patchRoot({
            tasks: difference(tasks, tasks.filter((task) => task.id === id))
        }))

    })

}

export default removeTask
