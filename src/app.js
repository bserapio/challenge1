
import React, { Component } from 'react';

import { Layout, Menu, Breadcrumb } from 'antd';

import {connect} from 'react-redux';
import 'antd/dist/antd.css';
const { Header, Content, Footer } = Layout;
const mapStateToProps = state => ({appName: state.appName});
class App extends Component {


    render() {
        return (<Layout className="layout">
            <Header>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    style={{ lineHeight: '64px' }}
                >
                    <Menu.Item key="1">nav 1</Menu.Item>
                    <Menu.Item key="2">nav 2</Menu.Item>
                    <Menu.Item key="3">nav 3</Menu.Item>
                </Menu>
            </Header>
            <Content style={{ padding: '0 50px' }}>
                {this.props.children}
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2016 Created by Ant UED</Footer>
        </Layout>)
    }
}
export default connect(mapStateToProps, () => ({}))(App);
