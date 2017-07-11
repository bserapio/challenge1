import {combineReducers} from 'redux';
import userReducer from './userReducer';
import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
    router: routerReducer,
    user: userReducer,
})

export default rootReducer;