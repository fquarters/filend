import { Reducer } from "redux";
import { AppAction } from "./action/actions";
import type { State } from "./data/state";
import { initialState } from "./data/state";
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

            return handlePatchSide(action.data, state)

        case 'PATCH_TAB':

            return handlePatchTab(action.data, state)

        case 'PATCH_MOVE_REQUEST':

            return {
                ...state,
                moveRequest: {
                    ...state.moveRequest,
                    ...action.data
                }
            }

        case 'PATCH_DRIVE_SELECT':

            return handlePatchSide({
                side: action.data.side,
                patch: {
                    driveSelectState: {
                        ...state[action.data.side].driveSelectState,
                        ...action.data.patch
                    }
                }
            }, state)
    }

}

export { rootReducer };

