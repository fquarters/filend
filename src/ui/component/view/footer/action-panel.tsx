import React from "react"
import Button from "../../common/button"
import "./action-panel.scss"

const ActionPanel = () => {

    return <div className="action-panel">
        <Button>F3 View</Button>
        <Button>F4 Edit</Button>
        <Button>F5 Copy</Button>
        <Button>F6 Move</Button>
        <Button>F7 New</Button>
        <Button>F8 Delete</Button>
    </div>
}

export default ActionPanel