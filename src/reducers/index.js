import {combineReducers} from 'redux';
import userReducer from './userReducer';
import clientReducer from './clientReducer';
import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
    router: routerReducer,
    user: userReducer,
    client: clientReducer,
})

export default rootReducer;