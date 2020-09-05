import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { patchTab } from "../store/action/action-creators"
import { Side } from "../store/data/state"

type ActiveTabNameUpdateArgs = {
    index: number,
    named: boolean,
    name: string,
    newName?: string,
    side: Side
}

const useActiveTabNameUpdate = ({
    index,
    named,
    name,
    newName,
    side
}: ActiveTabNameUpdateArgs) => {

    const dispatch = useDispatch()

    useEffect(() => {

        if (newName
            && !named
            && newName !== name) {

            dispatch(patchTab({
                index,
                patch: {
                    name: newName
                },
                side
            }))
        }

    }, [
        newName,
        name,
        named,
        dispatch,
        index,
        side
    ])
}

export default useActiveTabNameUpdate