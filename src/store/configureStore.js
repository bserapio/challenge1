import {createStore, applyMiddleware} from 'redux';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducers from '../reducers';

const history = createHistory();
const middleware = routerMiddleware(history);


// /write middleware
export const attachPathNameToAction = store => next => action => {
    action.pathname = store.getState().router.pathname;
    next(action);
};

const composeEnhancers = composeWithDevTools({
    // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

const enhancer = composeEnhancers(
    applyMiddleware(thunk, middleware, attachPathNameToAction)
    // other store enhancers if any
);

const configureStore = () => createStore(
            reducers, enhancer
);

const store = configureStore();

export default {
    history,
    store,


};
