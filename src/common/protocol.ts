import { Stats } from "original-fs";

type FileInfo = {
    name: string,
    path: string,
    stats: Stats
}

type DirInfo = {
    files: FileInfo[]
} & FileInfo

export type {
    FileInfo,
    DirInfo
}