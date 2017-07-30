import { createStore, applyMiddleware, combineReducers } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { composeWithDevTools } from 'redux-devtools-extension';

import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';


import thunk from 'redux-thunk';
import api from './modules/api';
import auth from './modules/auth';
import client from './modules/client';
import user from './modules/user';
import common from './modules/common';


const history = createHistory();
const middleware = routerMiddleware(history);

const axiosClient = axios.create({ // all axios can be used, shown in axios documentation
    baseURL: '/',
    responseType: 'json',
});

const reducer = combineReducers({
    router: routerReducer,
    api,
    auth,
    client,
    user,
    common,
});


const middlewareConfig = {
    interceptors: {
        request: [{
            success({ getState, dispatch, getSourceAction }, req) {

            },
            error({ getState, dispatch, getSourceAction }, error) {

            },
        },
        ],
        response: [{
            success({ getState, dispatch, getSourceAction }, res) {
                return res;

            },
            error({ getState, dispatch, getSourceAction }, err) {
                console.log(err);
                switch (err.response.status) {


                    case 401: {
                        localStorage.removeItem('user');
                        dispatch(api.error401());
                        throw err;
                    }
                    case 403: {
                        console.log('error 403');
                        dispatch(api.error403());
                        throw err;
                    }
                    case 405: {
                        console.log('error 405');
                        dispatch(api.error405());
                        throw err;
                    }
                    case 500: {
                        console.log('error 500');
                        dispatch(api.error500());
                        throw err;
                    }
                    default: {
                        throw err;
                    }
                }
            },
        },
        ],
    },
};


const composeEnhancers = composeWithDevTools({});

const enhancer = composeEnhancers(
    applyMiddleware(thunk, middleware, axiosMiddleware(axiosClient))
);

const configureStore = () => createStore(reducer, enhancer);

const store = configureStore();


export default {
    history,
    store,
};
