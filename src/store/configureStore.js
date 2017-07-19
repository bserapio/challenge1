import {createStore, applyMiddleware, compose} from 'redux';
import createHistory from 'history/createBrowserHistory';
import {routerMiddleware} from 'react-router-redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

const history = createHistory();
const middleware = routerMiddleware(history);


// /write middleware
export const attachPathNameToAction = store => next => action => {
    action.pathname = store.getState().router.pathname;
    next(action);
};


const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(thunk, middleware, attachPathNameToAction)
    // other store enhancers if any
);

const configureStore = () => createStore(
            reducers, enhancer
);

export default {
    history,
    configureStore,


};
