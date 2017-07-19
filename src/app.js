import 'antd/dist/antd.css';
import enUS from 'antd/lib/locale-provider/en_US';
import Link from 'react-router-redux-dom-link';
import React, { Component } from 'react';
import {Layout, Menu, LocaleProvider} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as userActions from './actions/userActions';

import history from './store/configureStore';
const { Header, Content, Footer } = Layout;


const mapStateToProps = state => ({
    auth: state.user.auth,
    users: state.user.users,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(userActions, dispatch),
});
class App extends Component {

    render() {
        const CurrentPath = history.history.location.pathname;
        const defaultKey = (CurrentPath === '/users') ? '2' : '1'; // Is not the best way but is working

        return (
            <LocaleProvider locale={enUS}>
                <Layout className="layout">
                    <Header>
                        <div className="logo"/>
                        {this.props.auth !== null &&
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
                        { this.props.children }
                    </Content>
                    <Footer style={{textAlign: 'center'}}>Ant Design ©2016 Created by Ant UED</Footer>
                </Layout>
            </LocaleProvider>);
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
