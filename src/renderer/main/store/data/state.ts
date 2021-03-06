import { CopyArgs, CopyConflict, CopyConflictResult, DeleteArgs, DirInfo, DirRemovalConfirm as DirRemovalConfirmArgs, FileInfo, HasId, MoveArgs } from "../../../../common/ipc/protocol";
import { Locales } from "../../../common/locales";

export type PageResult<T> = {
    data: Array<T>,
    total: number
}

export type TabState = {
    path: string,
    name: string,
    named: boolean,
    dirInfo: DirInfo | null,
    rowInFocus: number,
    selectedRows: number[],
    creatingNewDir: boolean,
    drive: string
}

export type SideState = {
    tabs: TabState[],
    activeTab: number,
    active: boolean,
    width: number | null,
    driveSelectState: DriveSelectState
}

export type TaskType = 'COPY' | 'MOVE' | 'DELETE'

export type TaskArgs = CopyArgs | MoveArgs | DeleteArgs

type Task<T extends TaskType, A extends TaskArgs> = {
    type: T,
    args: A,
    currentProgress: number,
    description: string
} & HasId

type CopyTask = Task<'COPY', CopyArgs>
type MoveTask = Task<'MOVE', MoveArgs>
type DeleteTask = Task<'DELETE', DeleteArgs>

export type TaskState = CopyTask | MoveTask | DeleteTask

export type HasResult<R> = {
    result: R | null
}

export type DeleteConfirm = {
    filenames: string[],
} & HasResult<boolean>

export type CopyConflictConfirm = CopyConflict
    & HasResult<CopyConflictResult>

export type DirRemovalConfirm = DirRemovalConfirmArgs
    & HasResult<CopyConflictResult>

export type MoveRequest = {
    sources: FileInfo[],
    destination: string
}

export type State = {
    left: SideState,
    right: SideState,
    hotkeysDisabled: boolean,
    tasks: TaskState[],
    moveRequest: MoveRequest,
    mountpoints: string[],
    locale: Locales
}

export type TabId = {
    side: Side,
    index: number
}

export type Side = 'left' | 'right'

export type DriveSelectState = {
    selecting: boolean,
    value: string
}

const defaultTabState: TabState = {
    path: '.',
    name: '.',
    named: false,
    rowInFocus: 0,
    dirInfo: null,
    selectedRows: [],
    creatingNewDir: false,
    drive: '/'
}

const defaultSideState: SideState = {
    tabs: [defaultTabState],
    activeTab: 0,
    active: false,
    width: null,
    driveSelectState: {
        selecting: false,
        value: '/'
    }
}

export const initialState: State = {
    left: {
        ...defaultSideState,
        active: true
    },
    right: defaultSideState,
    hotkeysDisabled: false,
    tasks: [],
    moveRequest: {
        destination: '',
        sources: []
    },
    mountpoints: [],
    locale: 'en'
}