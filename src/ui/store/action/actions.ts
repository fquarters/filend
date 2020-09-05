import { Action } from "redux";
import { State, Side, TabState, SideState } from "../data/state";

export type ActionType = 'PATCH_ROOT'
    | 'PATCH_SIDE'
    | 'PATCH_TAB';

export type SidePatch = {
    side: Side,
    patch: Partial<SideState>
}

export type TabPatch = {
    side: Side,
    index: number,
    patch: Partial<TabState>
}

export type PatchRoot = Action<'PATCH_ROOT'> & {
    data: Partial<State>
}

export type PatchSide = Action<'PATCH_SIDE'> & {
    data: SidePatch
}

export type PatchTab = Action<'PATCH_TAB'> & {
    data: TabPatch
}

export type AppAction = Action<ActionType> &
    (
        PatchRoot
        | PatchSide
        | PatchTab
    )
