import {applyMiddleware, createStore, MiddlewareAPI} from "redux";
import {rootReducer} from "./reducers";
import ReduxThunk from 'redux-thunk';
import storeLogger from "./middleware/store-logger";

const configureStore = () => {

    return createStore(rootReducer, applyMiddleware(ReduxThunk, storeLogger));
};

export default configureStore;