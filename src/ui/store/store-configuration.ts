import { applyMiddleware, createStore } from "redux";
import ReduxThunk from 'redux-thunk';
import storeLogger from "./middleware/store-logger";
import { rootReducer } from "./reducers";

const configureStore = () => createStore(rootReducer, applyMiddleware(ReduxThunk, storeLogger));

export default configureStore;