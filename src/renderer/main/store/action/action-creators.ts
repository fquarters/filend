import { MapFunction } from "../../../../common/types";
import { DriveSelectState, MoveRequest, State } from "../data/state";
import { DriveSelectPatch, PatchDriveSelect, PatchMoveRequest, PatchRoot, PatchSide, PatchTab, SidePatch, TabPatch } from "./actions";

const patchRoot: MapFunction<Partial<State>, PatchRoot> = (data): PatchRoot => ({
    type: 'PATCH_ROOT',
    data
})

const patchSide: MapFunction<SidePatch, PatchSide> = (data): PatchSide => ({
    type: 'PATCH_SIDE',
    data
})

const patchTab: MapFunction<TabPatch, PatchTab> = (data): PatchTab => ({
    type: 'PATCH_TAB',
    data
})

const patchMoveRequest: MapFunction<Partial<MoveRequest>, PatchMoveRequest> = (data): PatchMoveRequest => ({
    type: 'PATCH_MOVE_REQUEST',
    data
})

const patchDriveSelect: MapFunction<DriveSelectPatch, PatchDriveSelect> = (data): PatchDriveSelect => ({
    type: 'PATCH_DRIVE_SELECT',
    data
})

export {
    patchRoot,
    patchSide,
    patchTab,
    patchMoveRequest,
    patchDriveSelect
}
