import { AnyAction } from "redux"
import { ThunkDispatch } from "redux-thunk"
import { Supplier } from "../../../../common/types"
import { State } from "../data/state"
import deleteImpl from "./impl/delete-impl"


const deleteSelectedFiles = () => async (
    dispatch: ThunkDispatch<State, unknown, AnyAction>,
    getState: Supplier<State>
) => {

    deleteImpl({})(dispatch, getState)

}

export default deleteSelectedFiles