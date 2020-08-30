import { Action } from "redux";
import { State } from "../data/state";

export type ActionType = 'PATCH_ROOT';

export interface PatchRoot extends Action<'PATCH_ROOT'> {
    data: Partial<State>
}

export type AppAction = Action<ActionType> &
    (
        PatchRoot
    )
