import 'antd/dist/antd.css';
import enUS from 'antd/lib/locale-provider/en_US';
import Link from 'react-router-redux-dom-link';
import React, { Component } from 'react';
import {Layout, Menu, LocaleProvider, notification} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as userActions from './actions/userActions';
import * as apiActions from './actions/apiActions';
import history from './store/configureStore';
import './app.css';

const {Header, Content} = Layout;

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(userActions, dispatch),
    apiActions: bindActionCreators(apiActions, dispatch)
});

const mapStateToProps = state => ({
    auth: state.api.auth,
    users: state.user.users,
    apiError: state.api.apiError,
});


class App extends Component {

    render() {
        const {apiError, auth, children} = this.props;
        const CurrentPath = history.history.location.pathname;
        const defaultKey = (CurrentPath === '/users') ? ['2'] : ['1']; // Is not the best way but is working
        let username = null;
        let visibleNotification = null;
        if (apiError === null) {
            visibleNotification = null;
        } else {
            const message = apiError.message;
            visibleNotification = (notification['error']({
                message: 'ERROR',
                description: message,
            }));
        }
        if (auth) {
            username = (<span className="username">Hello {auth.username}</span>)
        } else {
            username = null
        }
        return (
            <LocaleProvider locale={enUS}>

                <Layout className="layout">

                    <Header>
                        <div className="logo"/>
                        {auth !== null &&


                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={defaultKey}
                            style={{lineHeight: '64px'}}
                        >
                            <Menu.Item key="1"><Link to="/clients">Clients</Link></Menu.Item>
                            <Menu.Item key="2"><Link to="/users">Users</Link></Menu.Item>
                            <Menu.Item key="3"><Link to="/logout">Log out</Link></Menu.Item>

                        </Menu>

                        }
                    </Header>
                    <Content style={{padding: '0 50px'}}>
                        {username}
                        {visibleNotification}
                        {children}
                    </Content>

                </Layout>
            </LocaleProvider>);
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
