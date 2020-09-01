import Logger from "js-logger";
import React from "react";
import { Row, Column } from "./common/bulma-wrappers";
import DirectoryView from "./directory-view";

Logger.useDefaults();

const App = () => {

    return <div className={'content mx-2'}>
        <Row>
            <Column size={6}>
                <DirectoryView />
            </Column>
            <Column size={6}>
                <DirectoryView />
            </Column>
        </Row>
    </div>
};

export default App