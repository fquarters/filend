import { MapFunction } from "../../common/types";
import { State } from "../data/state";
import { PatchRoot } from "./actions";

const patchRoot: MapFunction<Partial<State>, PatchRoot> = (patch) => ({
    type: 'PATCH_ROOT',
    data: patch
});

export {
    patchRoot
};
