import {createStore, applyMiddleware, combineReducers} from 'redux';
import {routerReducer, routerMiddleware} from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import api from './modules/api';
import auth from './modules/auth';
import client from './modules/client';
import user from './modules/user';

const history = createHistory();
const middleware = routerMiddleware(history);


const reducer = combineReducers({
    router: routerReducer,
    api,
    auth,
    client,
    user,
});


const composeEnhancers = composeWithDevTools({});

const enhancer = composeEnhancers(
    applyMiddleware(thunk, middleware)
);

const configureStore = () => createStore(reducer, enhancer);

const store = configureStore();


export default {
    history,
    store,
};
