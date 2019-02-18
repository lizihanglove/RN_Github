import {applyMiddleware, createStore, compose} from "redux";
import thunk from "redux-thunk";
import reducers from "../reducer";
import {middleware} from "../navigator/AppNavigator";

const logger = store => next => action => {
    if (typeof action === 'function') {
        console.log('dispatching a function');
    } else {
        console.log('dispatching ', action);
    }
    const result = next(action);
    console.log('nextSate ', result);
};

const middleWares = [middleware, thunk, logger];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(reducers, composeEnhancers(applyMiddleware(...middleWares)));