import { batch } from "react-redux"
import { AnyAction } from "redux"
import { ThunkDispatch } from "redux-thunk"
import { Supplier } from "../../../../common/types"
import { patchRoot } from "../action/action-creators"
import { State, TaskState } from "../data/state"

const pushTask = (task: TaskState) => (
    dispatch: ThunkDispatch<State, unknown, AnyAction>,
    getState: Supplier<State>
) => {

    const state = getState()

    const tasks = state.tasks

    batch(() => {

        dispatch(patchRoot({
            tasks: [...tasks, task]
        }))

    })

}

export default pushTask
