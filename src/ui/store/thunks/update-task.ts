import { AnyAction } from "redux"
import { ThunkDispatch } from "redux-thunk"
import { first, replacingElement } from "../../../common/collections"
import { Supplier } from "../../../common/types"
import { patchRoot } from "../action/action-creators"
import { State, TaskState } from "../data/state"

type TaskUpdate = Pick<TaskState, 'id' | 'currentProgress' | 'description'>

const updateTask = (update: TaskUpdate) => (
    dispatch: ThunkDispatch<State, unknown, AnyAction>,
    getState: Supplier<State>
) => {

    const state = getState()

    const tasks = state.tasks

    const matchById = (task: TaskState): boolean => task.id === update.id
    const current = first(tasks, matchById)

    if (current) {

        const nextTasks = replacingElement(tasks, {
            ...current,
            ...update
        }, matchById)

        dispatch(patchRoot({
            tasks: nextTasks
        }))
    }

}

export default updateTask
