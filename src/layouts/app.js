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
import utils from '../utils/index';

const {Header, Content} = Layout;

const mapDispatchToProps = dispatch => ({
    commonActions: bindActionCreators(commonAc, dispatch),
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
        const auth = utils.checkAuth();
        const {route} = nextProps;
        if (!auth) {
            try {
                if (route.location.pathname !== '/') {
                    window.location = '/';
                }
            } catch (err) {

            }
        }
    }


    render() {
        const {apiError, auth, children, route} = this.props;


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

App.propTypes = {

    commonActions: PropTypes.object.isRequired,
    config: PropTypes.object,
    apiError: PropTypes.object,
    auth: PropTypes.object,
    route: PropTypes.object.isRequired,


};

App.defaultProps = {
    clients: [],
    apiError: null,
    users: [],
    auth: [],
    config: null,
    children: null,
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
