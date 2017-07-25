import {Route} from 'react-router-dom';
import {ConnectedRouter} from 'react-router-redux';
import React from 'react';

import Home from '../containers/home/home';
import Users from '../containers/users/users';
import Clients from '../containers/client/client';
import Logout from '../containers/logout/logout';
import configureStore from '../ducks/configureStore';
import App from '../layouts/app';

export default() => (
    <App>

        <ConnectedRouter history={configureStore.history}>

            <div>
                <Route exact path="/" component={Home}/>
                <Route exact path="/users" component={Users}/>
                <Route exact path="/clients" component={Clients}/>
                <Route exact path="/logout" component={Logout}/>

            </div>

        </ConnectedRouter>
    </App>

);
