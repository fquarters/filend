import Logger from 'js-logger';
import type { State } from "./data/state";
import { initialState } from "./data/state";
import { Reducer } from "redux";
import { AppAction } from "./action/actions";

const log = Logger.get('root-reducer');

const rootReducer: Reducer<State, AppAction> = (state, action) => {

    log.debug(action);

    if (!state) {

        return initialState;
    }

    switch (action.type) {

        case 'PATCH_ROOT':
            return {
                ...state,
                ...action.data
            }
    }

};

export { rootReducer }