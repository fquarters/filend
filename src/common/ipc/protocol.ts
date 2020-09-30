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

type HasSourceFiles = {
    source: string[]
}

type HasDestination = {
    destination: string
}

type CopyArgs = HasId
    & HasSourceFiles
    & HasDestination

type MoveArgs = CopyArgs

type DeleteArgs = {
    permanently: boolean
} & HasId
    & HasSourceFiles

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

type DirRemovalConfirm = {
    path: string,
    confirmId: string
} & HasId

type DeleteProgress = {
    currentFile: string
} & HasId

type OperationError = {
    message: string
} & HasId


type ViewFileArgs = {
    path: string
} & HasId

type ViewFileChunkArgs = {
    start: number,
    encoding: BufferEncoding
} & ViewFileArgs

type ViewFileChunkResponse = {
    content: string,
    size: number,
    totalSize: number
}

type CopyConflictResult = 'ok' | 'all' | 'cancel'

type DirRemovalConfirmResult = CopyConflictResult

export type {
    FileInfo,
    DirInfo,
    InitInfo,
    CommandData,
    CopyArgs,
    MoveArgs,
    DeleteArgs,
    CopyProgress,
    CopyConflict,
    CopyResult,
    HasId,
    HasDestination,
    HasSourceFiles,
    FileInfoStats,
    OperationError,
    CopyConflictResult,
    DirRemovalConfirm,
    DirRemovalConfirmResult,
    DeleteProgress,
    ViewFileArgs,
    ViewFileChunkArgs,
    ViewFileChunkResponse
};
