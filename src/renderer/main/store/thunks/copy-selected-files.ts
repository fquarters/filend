import { AnyAction } from "redux"
import { ThunkDispatch } from "redux-thunk"
import { Supplier } from "../../../../common/types"
import Strings from "../../../common/strings"
import { State } from "../data/state"
import copyImpl from "./impl/copy-impl"

const copySelectedFiles = () => async (
    dispatch: ThunkDispatch<State, unknown, AnyAction>,
    getState: Supplier<State>
) => {

    copyImpl({
        getTaskDescription: (args) => Strings.getTemplate('copyTaskDescription', args)
    })(dispatch, getState)

}

export default copySelectedFiles