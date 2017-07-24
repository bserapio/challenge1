import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import appReducer from './appReducer';

const rootReducer = combineReducers({
    router: routerReducer,
    app: appReducer,
});

export default rootReducer;
