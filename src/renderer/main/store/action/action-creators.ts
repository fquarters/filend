import { MapFunction } from "../../../../common/types";
import { State } from "../data/state";
import { PatchRoot, PatchSide, PatchTab, SidePatch, TabPatch } from "./actions";

const patchRoot: MapFunction<Partial<State>, PatchRoot> = (data): PatchRoot => ({
    type: 'PATCH_ROOT',
    data
});

const patchSide: MapFunction<SidePatch, PatchSide> = (data): PatchSide => ({
    type: 'PATCH_SIDE',
    data
});

const patchTab: MapFunction<TabPatch, PatchTab> = (data): PatchTab => ({
    type: 'PATCH_TAB',
    data
});

export {
    patchRoot,
    patchSide,
    patchTab
};
