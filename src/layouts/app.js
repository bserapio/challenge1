import 'antd/dist/antd.css';
import enUS from 'antd/lib/locale-provider/en_US';
import Link from 'react-router-redux-dom-link';

import React from 'react';
import PropTypes from 'prop-types';
import {Layout, Menu, LocaleProvider, notification} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import './app.css';
import * as commonAc from '../ducks/modules/common';
import * as authAc from '../ducks/modules/auth';
import * as apiAc from '../ducks/modules/api';
import utils from '../utils/index';

const {Header, Content} = Layout;

const mapDispatchToProps = dispatch => ({
    commonActions: bindActionCreators(commonAc, dispatch),
    authActions: bindActionCreators(authAc, dispatch),
    apiActions: bindActionCreators(apiAc, dispatch),
});

const mapStateToProps = state => ({
    auth: state.auth.auth,
    users: state.user.users,
    apiError: state.api.apiError,
    route: state.router,
    config: state.common.config,
});


class App extends React.Component {

    componentDidMount() {
        const {commonActions} = this.props;
        commonActions.getConfig();
    }

    componentWillReceiveProps(nextProps) {
        const {auth} = this.props;
        const {route} = nextProps;
        if (nextProps.auth.role !== auth.role) {
            if (nextProps.auth.role === 'guest') {
                try {
                    if (route.location.pathname !== '/') {
                        window.location = '/';
                    }
                } catch (err) {
                    throw err;
                }
            }
        }
    }

    logout = () => {
        const {authActions} = this.props;
        authActions.logOutUser();
    };


    render() {
        const {apiError, auth, children, route, apiActions} = this.props;


        const CurrentPath = route.location;
        const defaultKey = (CurrentPath === '/users') ? ['2'] : ['1']; // Is not the best way but is working
        let username = null;
        let visibleNotification = null;
        if (apiError === null) {
            visibleNotification = null;
        } else {
            const message = apiError.message;
            visibleNotification = (notification.error({
                message: 'ERROR',
                description: message,
            }));
            apiActions.clearError()
        }
        if (auth) {
            username = (<span className="username">Hello {auth.username}</span>);
        } else {
            username = null;
        }
        return (
            <LocaleProvider locale={enUS}>

                <Layout className="layout">

                    <Header>
                        <div className="logo"/>
                        {auth !== null && auth.role !== 'guest' &&


                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={defaultKey}
                            style={{lineHeight: '64px'}}
                        >
                            <Menu.Item key="1"><Link to="/clients">Clients</Link></Menu.Item>
                            <Menu.Item key="2"><Link to="/users">Users</Link></Menu.Item>
                            <Menu.Item key="3"><Link to="/logout" onClick={this.logout}>Log out</Link></Menu.Item>

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

App.propTypes = {

    commonActions: PropTypes.object.isRequired,
    authActions: PropTypes.object.isRequired,
    apiActions: PropTypes.object.isRequired,
    apiError: PropTypes.object,
    auth: PropTypes.object,
    children: PropTypes.object,
    route: PropTypes.object.isRequired,


};

App.defaultProps = {
    clients: [],
    apiError: null,
    users: [],
    auth: [],
    children: null,
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
