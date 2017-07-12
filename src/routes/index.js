import React from 'react';
import Home from '../containers/home/home';
import Users from '../containers/users/users';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import configureStore from '../store/configureStore'
import  App from '../app';
export default() => (
    <App>

        <ConnectedRouter history={configureStore.history}>

            <div>
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/users" component={Users}></Route>
            </div>

        </ConnectedRouter>
    </App>

);