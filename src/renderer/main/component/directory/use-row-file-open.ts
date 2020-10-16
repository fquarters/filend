import { useDispatch } from "react-redux"
import { useCallback } from "react"
import openFileInFocus from "../../store/thunks/open-file-in-focus"

const useRowFileOpen = () => {

    const dispatch = useDispatch()

    return useCallback(() => dispatch(openFileInFocus()), [
        dispatch
    ])
}

export default useRowFileOpen