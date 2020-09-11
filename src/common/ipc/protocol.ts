import { Stats } from "original-fs";

type EvaluatedStats = {
    isFile: boolean,
    isDirectory: boolean
}

type FileInfoStats = Omit<Stats, 'isFile' | 'isDirectory'> & EvaluatedStats

type FileInfo = {
    name: string,
    path: string,
    stats: FileInfoStats
}

type DirInfo = {
    files: FileInfo[]
} & FileInfo

type InitInfo = {
    locale: string
}

type CommandData = {
    path: string,
    command: string
}

export type {
    FileInfo,
    DirInfo,
    InitInfo,
    CommandData
}