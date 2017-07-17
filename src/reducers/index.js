import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import userReducer from './userReducer';
import clientReducer from './clientReducer';

const rootReducer = combineReducers({
    router: routerReducer,
    user: userReducer,
    client: clientReducer,
});

export default rootReducer;
