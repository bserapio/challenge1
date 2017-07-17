import 'antd/dist/antd.css';
import Link from 'react-router-redux-dom-link';
import React, { Component } from 'react';

import {Layout, Menu} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as userActions from './actions/userActions';


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
        return (<Layout className="layout">
            <Header>
                <div className="logo" />
                {this.props.auth !== null &&
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} style={{lineHeight: '64px'}}>

                    <Menu.Item key="1"><Link to="/users" activeClassName="active">Users</Link></Menu.Item>
                    <Menu.Item key="2"><Link to="/clients" activeClassName="active">Clients</Link></Menu.Item>
                    <Menu.Item key="3"><Link to="/client_meta" activeClassName="active">Databases</Link></Menu.Item>

                </Menu>
                }
            </Header>
            <Content style={{ padding: '0 50px' }}>
                {this.props.children}
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2016 Created by Ant UED</Footer>
        </Layout>);
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
