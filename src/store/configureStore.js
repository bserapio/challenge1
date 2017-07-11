import { createStore, combineReducers, applyMiddleware } from 'redux'
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import reducers from '../reducers'
const history = createHistory();
const middleware = routerMiddleware(history);

const configureStore = () =>{
 return    createStore(
        combineReducers({
            ...reducers,
            router: routerReducer
        }),
        applyMiddleware(middleware)
    )
}

export default {
    history:     history,
    configureStore:  configureStore,


};
