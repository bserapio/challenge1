import {Table} from 'antd';
import React from 'react';
import { Button } from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import CollectionCreateForm from '../../components/modals/createUserForm'

import * as userActions from '../../actions/userActions';
import './user.css'
const mapStateToProps = function (state) {
    return {
        auth: state.user.auth,
        users: state.user.users
    }
};

const mapDispatchToProps = function (dispatch) {
    return {
        actions: bindActionCreators(userActions, dispatch)
    };
};


const columns = [
    {
        title: 'Username',
        dataIndex: 'username',
        width: '20%',
        onFilter: (value, record) => record.username.indexOf(value) === 0,
        sorter: (a, b) => {
            var nameA = a.username.toUpperCase(); // ignore upper and lowercase
            var nameB = b.username.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }

            // names must be equal
            return 0;

        },
    }
    ,
    {
        title: 'Name',
        dataIndex: 'name',
        onFilter: (value, record) => record.name.indexOf(value) === 0,
        sorter: (a, b) => {
            var nameA = a.name.toUpperCase(); // ignore upper and lowercase
            var nameB = b.name.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }

            // names must be equal
            return 0;

        },
    },
    {
        title: 'Role',
        dataIndex: 'role',
        width: '20%',
        onFilter: (value, record) => record.role.indexOf(value) === 0,
        sorter: (a, b) => {
            var nameA = a.role.toUpperCase(); // ignore upper and lowercase
            var nameB = b.role.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }

            // names must be equal
            return 0;

        },
    },
    {
        title: 'Created',
        dataIndex: 'createdAt',
        width: '20%',
    },
    {
        title: 'Modified',
        dataIndex: 'modifiedAt',
        filters: [
            {text: 'Male', value: 'male'},
            {text: 'Female', value: 'female'},
        ],
        width: '20%',
    },




];



class User extends React.Component {
    state = {
        data: [],
        pagination: {},
        loading: false,
        visible: false,
        confirmLoading: false
    };
    componentDidMount() {
        this.props.actions.checkAuth(this.props.auth);
        this.props.actions.getUsers();
    }

    handleTableChange = (pagination, filters, sorter) => {

    };

    showModal = () => {
        this.setState({ visible: true });
    }
    handleCancel = () => {
        this.setState({ visible: false });
    }
    handleCreate = () => {
        const form = this.form;
        this.setState({
            ModalText: 'The modal will be closed after two seconds',
            confirmLoading: true,
        });
        form.validateFields((err, values) => {
            if (err) {
                return;
            } else {
                this.props.actions.createUser(values).then(
                    (res)=> {
                        this.setState({ visible: false,confirmLoading: false });
                    },
                    (err)=> {

                    }
                )

            }

            console.log('Received values of form: ', values);
            form.resetFields();
            this.setState({ visible: false });
        });
    }
    saveFormRef = (form) => {
        this.form = form;
    }





    render() {
        return (
           <div>
        <Button type="primary" onClick={this.showModal} class="wrapper">Create an User</Button>
                <CollectionCreateForm
                    ref={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    confirmLoading={this.state.confirmLoading}
                    onCreate={this.handleCreate}
                />

            <Table columns={columns}
                   rowKey={record => record.id}
                   dataSource={this.props.users.rows}
                   pagination={this.state.pagination}
                   loading={this.state.loading}
                   onChange={this.handleTableChange}
            />
            </div>
        );

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)