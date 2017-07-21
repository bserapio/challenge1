import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import Routes from './routes';



ReactDOM.render(
    <Provider store={configureStore.store}>
        <Routes />
    </Provider>,
    document.getElementById('root')
);
