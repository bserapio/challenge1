import {createStore, applyMiddleware} from 'redux';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducers from '../reducers';

const history = createHistory();
const middleware = routerMiddleware(history);


export const attachPathNameToAction = store => next => action => {
    action.pathname = store.getState().router.pathname;
    next(action);
};

const composeEnhancers = composeWithDevTools({});

const enhancer = composeEnhancers(
    applyMiddleware(thunk, middleware, attachPathNameToAction)
);

const configureStore = () => createStore(
            reducers, enhancer
);

const store = configureStore();

export default {
    history,
    store,
};
