import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import {Route} from 'react-router-dom';
import {ConnectedRouter} from 'react-router-redux';

import configureStore from './ducks/configureStore';
import Home from './containers/home/home';
import Users from './containers/users/users';
import Clients from './containers/client/client';
import Logout from './containers/logout/logout';
import App from './layouts/app';

ReactDOM.render(
    <Provider store={configureStore.store}>
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
    </Provider>,
    document.getElementById('root')
);
