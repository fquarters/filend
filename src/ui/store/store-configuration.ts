import {applyMiddleware, createStore} from "redux";
import {rootReducer} from "./reducers";
import ReduxThunk from 'redux-thunk';

const configureStore = () => {

    return createStore(rootReducer, applyMiddleware(ReduxThunk));
};

export default configureStore;