import React from "react"

type TabViewProps = {
    name: string,
    active: boolean
}

const TabView = ({ name, active }: TabViewProps) => {

    return <span>{name}</span>
}

export default TabView