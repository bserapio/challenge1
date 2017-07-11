import { createStore, combineReducers, applyMiddleware,compose} from 'redux'
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import reducers from '../reducers'
import thunk from 'redux-thunk'
const history = createHistory();
const middleware = routerMiddleware(history);

const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;


const enhancer = composeEnhancers(
    applyMiddleware(thunk, middleware),
    // other store enhancers if any
);

const configureStore = () =>{
 return    createStore(
        combineReducers({
            ...reducers,
            router: routerReducer
        }),enhancer


    )
}



export default {
    history:     history,
    configureStore:  configureStore,


};
