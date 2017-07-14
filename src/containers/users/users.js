'use strict';
import {Button, Table} from "antd";
import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import UserCreateForm from "../../components/modals/createUserForm";

import * as userActions from "../../actions/userActions";
import "./user.css";
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

const stringOrder = (a, b) => {
    {
        const nameA = a.username.toUpperCase();
        const nameB = b.username.toUpperCase();


        if (nameA < nameB) {
            return -1;
        } else if (nameA > nameB) {
            return 1;
        } else {
            return 0;
        }


    }
};

class User extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.columns = [
            {
                title: 'Username',
                dataIndex: 'username',
                onFilter: (value, record) => record.username.indexOf(value) === 0,
                sorter: (a, b) => stringOrder(a, b),
            }
            ,
            {
                title: 'Name',
                dataIndex: 'name',
                onFilter: (value, record) => record.name.indexOf(value) === 0,
                sorter: (a, b) => stringOrder(a, b),
            },
            {
                title: 'Role',
                dataIndex: 'role',
                onFilter: (value, record) => record.role.indexOf(value) === 0,
                sorter: (a, b) => stringOrder(a, b),
                filters: [
                    {
                        text: 'Guest',
                        value: 'Guest',
                    },
                    {
                        text: 'User',
                        value: 'user',
                    },
                    {
                        text: 'Finance',
                        value: 'finance',
                    },
                    {
                        text: 'Manager',
                        value: 'manager',
                    }
                    , {
                        text: 'Sales',
                        value: 'sales',
                    }, {
                        text: 'Account manager',
                        value: 'account-manager',
                    }
                    , {
                        text: 'Admin',
                        value: 'admin',
                    }
                    , {
                        text: 'Super',
                        value: 'super',
                    }

                ],
            },
            {
                title: 'Created',
                dataIndex: 'createdAt',
            },
            {
                title: 'Modified',
                dataIndex: 'modifiedAt',
            },


        ];
        this.state = {
            data: [],
            pagination: {},
            loading: false,
            visible: false,
            confirmLoading: false,
            locale: {
                filterConfirm: 'Ok',
                filterReset: 'Reset',
                emptyText: 'No Data'
            },
            userForm: {
                username: '',
                password: '',
                role: 'super',
                name: ''
            }

        };
    }

    componentDidMount() {
        this.props.actions.checkAuth(this.props.auth);
        this.props.actions.getUsers();
    }

    handleTableChange = (pagination, filters, sorter) => {

    };
    showModal = () => {
        this.setState({visible: true});
    };
    handleCancel = () => {
        this.setState({visible: false});
    };
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
                let userForm = this.state.userForm;
                userForm.username = values.username;
                userForm.password = values.password;
                userForm.name = values.name;

                this.setState({userForm: userForm}, this.sendForm);
                form.resetFields();
                this.setState({visible: false});
            }
        })

    }
    saveFormRef = (form) => {
        this.form = form;
    };
    sendForm() {

        this.props.actions.createUser(this.state.userForm).then(
            (res) => {
                this.setState({visible: false, confirmLoading: false});
            },
            (err) => {
            }
        )
    };
    handleSelectChange = (value) => {
        let userForm = this.state.userForm;
        userForm.role = value;
        this.setState({userForm: userForm});

    };

    render() {
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>Create an User</Button>
                <UserCreateForm
                    ref={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    confirmLoading={this.state.confirmLoading}
                    onCreate={this.handleCreate}
                    onChange={value => this.handleSelectChange(value)}

                />

                <Table columns={this.columns}
                       rowKey={record => record.id}
                       dataSource={this.props.users.rows}
                       pagination={this.state.pagination}
                       loading={this.state.loading}
                       onChange={this.handleTableChange}
                       locale={this.state.locale}
                />
            </div>
        );

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)