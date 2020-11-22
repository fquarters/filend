import { Action } from "redux";
import { DriveSelectState, MoveRequest, Side, SideState, State, TabId, TabState } from "../data/state";

export type ActionType = 'PATCH_ROOT'
    | 'PATCH_SIDE'
    | 'PATCH_TAB'
    | 'PATCH_MOVE_REQUEST'
    | 'PATCH_DRIVE_SELECT'

export type SidePatch = {
    side: Side,
    patch: Partial<SideState>
}

export type DriveSelectPatch = {
    side: Side,
    patch: Partial<DriveSelectState>
}

export type TabPatch = TabId & {
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

export type PatchMoveRequest = Action<'PATCH_MOVE_REQUEST'> & {
    data: Partial<MoveRequest>
}

export type PatchDriveSelect = Action<'PATCH_DRIVE_SELECT'> & {
    data: DriveSelectPatch
}

export type AppAction = Action<ActionType> &
    (
        PatchRoot
        | PatchSide
        | PatchTab
        | PatchMoveRequest
        | PatchDriveSelect
    )
