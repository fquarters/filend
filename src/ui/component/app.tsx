import Logger from "js-logger";
import React from "react";
import { Column, Row } from "./common/bulma-wrappers";
import SideView from "./view/side-view";

Logger.useDefaults();

const App = () => {

    return <div className={'content mx-2'}>
        <Row>
            <Column size={6}>
                <SideView side={'left'} />
            </Column>
            <Column size={6}>
                <SideView side={'right'} />
            </Column>
        </Row>
    </div>
};

export default App