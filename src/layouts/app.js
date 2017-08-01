import 'antd/dist/antd.css';
import enUS from 'antd/lib/locale-provider/en_US';
import Link from 'react-router-redux-dom-link';

import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, LocaleProvider, notification, Popconfirm } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './app.css';
import * as commonAc from '../ducks/modules/common';
import * as authAc from '../ducks/modules/auth';
import * as apiAc from '../ducks/modules/api';


const { Header, Content } = Layout;

const mapDispatchToProps = dispatch => ({
    commonActions: bindActionCreators(commonAc, dispatch),
    authActions: bindActionCreators(authAc, dispatch),
    apiActions: bindActionCreators(apiAc, dispatch),
});

const mapStateToProps = state => ({
    auth: state.auth.auth,
    users: state.user.users,
    apiError: state.api.apiError,
    router: state.router,
    config: state.common.config,
});


class App extends React.Component {

    componentDidMount() {
        const { commonActions, authActions } = this.props;
        commonActions.getConfigAction();
        authActions.checkAuthAction();
    }

    componentWillReceiveProps(nextProps) {
        const { auth, router } = this.props;


        if (nextProps.auth.role !== auth.role) {
            if (nextProps.auth.role === 'guest') {
                try {
                    if (router.location.pathname !== '/') {
                        window.location = '/';
                    }
                } catch (err) {
                    throw err;
                }
            }
        }
    }

    logout = () => {
        const { authActions } = this.props;
        authActions.logOutUserAction();
    };


    render() {
        const { apiError, auth, children, router, apiActions, config } = this.props;

        let CurrentPath;
        try {
            CurrentPath = router.location.pathname;
        } catch (exception) {
            CurrentPath = '/';
        }

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
            apiActions.clearError();
        }
        if (auth.role !== 'guest') {
            username = (<span className="username">Hello {auth.username}</span>);
        } else {
            username = null;
        }
        let userMenu = null;
        if (config && config.acl.managerGroup.indexOf(auth.role) !== -1) {
            userMenu = (<Menu.Item key="2"><Link to="/users">Users</Link></Menu.Item>);
        } else {
            userMenu = null;
        }


        return (
            <LocaleProvider locale={enUS}>

                <Layout className="layout">

                    <Header>
                        <div className="logo" />
                        {auth !== null && auth.role !== 'guest' &&


                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={defaultKey}
                            style={{ lineHeight: '64px' }}
                        >
                            <Menu.Item key="1"><Link to="/clients">Clients</Link></Menu.Item>
                            {userMenu}
                            <Menu.Item key="3"> <Popconfirm
                                placement="top"
                                title="Are you sure that want log out?"
                                onConfirm={this.logout}
                                okText="Yes"
                                cancelText="No"
                                key="deletePopup"
                            >Log out</Popconfirm></Menu.Item>

                        </Menu>

                        }
                    </Header>
                    <Content style={{ padding: '0 50px' }}>
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
    router: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,

};

App.defaultProps = {
    clients: [],
    apiError: null,
    users: [],
    auth: [],

    children: null,
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
