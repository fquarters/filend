export type PageResult<T> = {
    data: Array<T>,
    total: number
}

export type TabState = {
    path: string,
    name: string,
    named: boolean
}

export type SideState = {
    tabs: TabState[],
    activeTab: number
}

export type State = {
    left: SideState,
    right: SideState
};

export type TabId = {
    side: Side,
    index: number
}

export type Side = 'left' | 'right'

const defaultTabState: TabState = {
    path: './',
    name: './',
    named: false
}

const defaultSideState: SideState = {
    tabs: [defaultTabState],
    activeTab: 0
}

export const initialState: State = {
    left: defaultSideState,
    right: defaultSideState
};