import React from "react"
import ActionPanel from "./action-panel"
import ExecutePanel from "./execute-panel"
import "./footer-view.css"

const FooterView = () => {

    return <div className="footer-view">
        <ExecutePanel />
        <ActionPanel />
    </div>
}

export default FooterView