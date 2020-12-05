import { Reducer, useReducer } from "react"
import { difference, union } from "../../../common/collections"

type SelectState<T> = {
    open: boolean,
    value: T[],
    focusedOption: number,
    multiple: boolean,
    selectedValue: T[] | null 
}

type SelectActionType = 'OPEN'
    | 'CLOSE'
    | 'TOGGLE'
    | 'SET_FOCUSED_OPTION'
    | 'REMOVE_FOCUS'
    | 'FOCUS_NEXT_OPTION'
    | 'FOCUS_PREV_OPTION'
    | 'SET_VALUE'
    | 'SELECT_OPTION'
    | 'CLEAR_SELECTED'

type SelectAction<T extends SelectActionType> = {
    type: T
}

type OpenAction = SelectAction<'OPEN'>

type CloseAction = SelectAction<'CLOSE'>

type ToggleAction = SelectAction<'TOGGLE'>

type ClearSelectedAction = SelectAction<'CLEAR_SELECTED'>

type OptionCount = number

type FocusNextOptionAction = SelectAction<'FOCUS_NEXT_OPTION'> & {
    data: OptionCount
}

type FocusPrevOptionAction = SelectAction<'FOCUS_PREV_OPTION'>

type RemoveFocusAction = SelectAction<'REMOVE_FOCUS'> & {
    data: number
}

type SetFocusedOptionAction = SelectAction<'SET_FOCUSED_OPTION'> & {
    data: number
}

type SetValueAction<T> = SelectAction<'SET_VALUE'> & {
    data: T[]
}

type SelectedOption<T> = {
    value: T,
    index: number
}

type SelectOptionAction<T> = SelectAction<'SELECT_OPTION'> & {
    data: SelectedOption<T>
}

export type SomeSelectAction<T> = SelectAction<SelectActionType> & (
    OpenAction
    | CloseAction
    | ToggleAction
    | RemoveFocusAction
    | FocusNextOptionAction
    | FocusPrevOptionAction
    | SetFocusedOptionAction
    | SetValueAction<T>
    | SelectOptionAction<T>
    | ClearSelectedAction
)

const getDefaultState = <T>(overrides?: Partial<SelectState<T>>): SelectState<T> => ({
    open: false,
    value: [],
    focusedOption: -1,
    multiple: false,
    selectedValue: [],
    ...overrides
})

const reducer = <T>(state: SelectState<T>,
    action: SomeSelectAction<T>): SelectState<T> => {

    switch (action.type) {
        case 'OPEN': return {
            ...state,
            open: true
        }
        case 'CLOSE': return {
            ...state,
            open: false
        }
        case 'TOGGLE': return {
            ...state,
            open: !state.open
        }
        case 'FOCUS_NEXT_OPTION': return {
            ...state,
            focusedOption: Math.min(action.data - 1, state.focusedOption + 1)
        }
        case 'FOCUS_PREV_OPTION': return {
            ...state,
            focusedOption: Math.max(0, state.focusedOption - 1)
        }
        case 'SET_FOCUSED_OPTION': return {
            ...state,
            focusedOption: action.data
        }
        case 'REMOVE_FOCUS': return {
            ...state,
            focusedOption: state.focusedOption == action.data ? -1 : state.focusedOption
        }
        case 'SET_VALUE': {

            if (action.data != state.value) {

                return {
                    ...state,
                    value: action.data
                }
            }

            return state
        }
        case 'CLEAR_SELECTED': return {
            ...state,
            selectedValue: null
        }
        case 'SELECT_OPTION': {

            const getNextValue = (optionValue: T) => {

                if (state.multiple) {

                    if (state.value.indexOf(optionValue) > -1) {

                        return difference(state.value, [optionValue])

                    } else {

                        return union(state.value, [optionValue])
                    }

                } else {

                    return [optionValue]
                }
            }

            const nextValue = getNextValue(action.data.value)

            return {
                ...state,
                focusedOption: action.data.index,
                value: nextValue,
                open: false,
                selectedValue: nextValue
            }

        }
    }
}

const useSelectReducer = <T>(defaultState: Partial<SelectState<T>>) =>
    useReducer<Reducer<SelectState<T>, SomeSelectAction<T>>>(reducer, getDefaultState(defaultState))

export default useSelectReducer