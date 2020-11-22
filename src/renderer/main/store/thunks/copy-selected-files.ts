import { AnyAction } from "redux"
import { ThunkDispatch } from "redux-thunk"
import { Supplier } from "../../../../common/types"
import { Locales } from "../../../common/locales"
import Strings from "../../../common/strings"
import { State } from "../data/state"
import copyImpl from "./impl/copy-impl"

const copySelectedFiles = () => async (
    dispatch: ThunkDispatch<State, unknown, AnyAction>,
    getState: Supplier<State>
) => {

    copyImpl({
        getTaskDescription: (locale: Locales) =>
            (args) => Strings.getTemplate(locale)('copyTaskDescription', args)
    })(dispatch, getState)

}

export default copySelectedFiles