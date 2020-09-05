import Logger from 'js-logger';
import { Reducer } from "redux";
import { AppAction } from "./action/actions";
import { initialState } from "./data/state";
import type { State } from "./data/state";
import patchSide from './handler/patch-side-handler';
import patchTab from './handler/patch-tab-handler';

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

        case 'PATCH_SIDE':

            return patchSide(action, state)

        case 'PATCH_TAB':

            return patchTab(action, state)
    }

};

export { rootReducer };
