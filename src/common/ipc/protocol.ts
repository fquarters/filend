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

type HasId = {
    id: string
}

type CopyArgs = {
    source: string[],
    destination: string
} & HasId

type CopyResult = {
    finished: boolean,
    error?: string
} & HasId

type CopyProgress = {
    currentFile: string,
    currentCopied: number,
    currentSize: number
} & HasId

type CopyConflict = {
    name: string,
    destination: string,
    conflictId: string
} & HasId

type OperationError = {
    message: string
} & HasId

type CopyConflictResult = 'ok' | 'all' | 'cancel'

export type {
    FileInfo,
    DirInfo,
    InitInfo,
    CommandData,
    CopyArgs,
    CopyProgress,
    CopyConflict,
    CopyResult,
    HasId,
    FileInfoStats,
    OperationError,
    CopyConflictResult
};
