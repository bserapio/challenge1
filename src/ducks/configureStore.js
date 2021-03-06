import { createStore, applyMiddleware, combineReducers } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { composeWithDevTools } from 'redux-devtools-extension';

import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

import thunk from 'redux-thunk';
import utils from '../utils/';
import * as apiAc from './modules/api';
import auth from './modules/auth';
import client from './modules/client';
import user from './modules/user';
import common from './modules/common';


const history = createHistory();
const middleware = routerMiddleware(history);

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

const axiosClient = axios.create({ // all axios can be used, shown in axios documentation
    baseURL: '/',
    withCredentials: true,
    cancelToken: source.token,

});

const reducer = combineReducers({
    router: routerReducer,
    api: apiAc.default,
    auth,
    client,
    user,
    common,
});


const middlewareConfig = {
    interceptors: {
        request: [{
            success({ getState, dispatch, getSourceAction }, req) {
                req.headers.Authorization = `bearer ${utils.getToken()}`;
                dispatch(apiAc.sendRequest(req));
                return req;
            },
            error({ getState, dispatch, getSourceAction }, error) {
                console.log(error);
                return error;
            },
        },
        ],
        response: [{
            success({ getState, dispatch, getSourceAction }, req) {
                return req;
            },
            error({ getState, dispatch, getSourceAction }, error) {
                if (error.response) {
                    switch (error.response.status) {
                        case 400: {
                            return dispatch(apiAc.error400(error.response.data));
                        }
                        case 401: {
                            return dispatch(apiAc.error401());
                        }
                        case 403: {
                            return dispatch(apiAc.error403());
                        }
                        case 405: {
                            return dispatch(apiAc.error405());
                        }
                        case 500: {
                            return dispatch(apiAc.error500());
                        }
                        default: {
                            throw error;
                        }

                    }
                }
                return error;
            },
        },
        ],
    },
};
const composeEnhancers = composeWithDevTools({});

const enhancer = composeEnhancers(
    applyMiddleware(thunk, middleware, axiosMiddleware(axiosClient, middlewareConfig))
);

const configureStore = () => createStore(reducer, enhancer);

const store = configureStore();


export default {
    history,
    store,
};
