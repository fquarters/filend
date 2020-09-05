import React from "react"
import { useSelector } from "react-redux"
import Selectors from "../../store/data/selectors"
import { Side } from "../../store/data/state"

type TabViewProps = {
    side: Side,
    index: number,
    active: boolean
}

const TabView = ({ side, index, active }: TabViewProps) => {

    const {
        path
    } = useSelector(Selectors.tab({ side, index }))

    return <span>{path}</span>
}

export default TabView