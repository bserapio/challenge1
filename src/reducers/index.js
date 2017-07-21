import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import userReducer from './userReducer';
import clientReducer from './clientReducer';
import apiReducer from './apiReducer';

const rootReducer = combineReducers({
    router: routerReducer,
    user: userReducer,
    client: clientReducer,
    api: apiReducer,
});

export default rootReducer;
