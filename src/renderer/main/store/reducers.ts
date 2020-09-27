import { Reducer } from "redux";
import { AppAction } from "./action/actions";
import { initialState } from "./data/state";
import type { State } from "./data/state";
import handlePatchSide from './handler/patch-side-handler';
import handlePatchTab from './handler/patch-tab-handler';

const rootReducer: Reducer<State, AppAction> = (state, action) => {

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

            return handlePatchSide(action, state)

        case 'PATCH_TAB':

            return handlePatchTab(action, state)
    }

};

export { rootReducer };
