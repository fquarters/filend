import { MapFunction } from "../../../../common/types";
import { MoveRequest, State } from "../data/state";
import { PatchMoveRequest, PatchRoot, PatchSide, PatchTab, SidePatch, TabPatch } from "./actions";

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

export {
    patchRoot,
    patchSide,
    patchTab,
    patchMoveRequest
}
