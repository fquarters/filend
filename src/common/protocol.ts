import { Stats } from "original-fs";

type FileInfo = {
    name: string,
    path: string,
    stats: Stats
}

export type {
    FileInfo
}