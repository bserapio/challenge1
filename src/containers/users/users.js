import React from 'react';
import PropTypes from 'prop-types';

import { Button, Table } from 'antd';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import UserCreateForm from '../../components/modals/createUserForm';

import * as userActions from '../../actions/userActions';
import './user.css';

const utils = require('../../utils/');

const mapStateToProps = state => ({
    auth: state.user.auth,
    users: state.user.users,
    createError: state.user.createError,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(userActions, dispatch),
});


class User extends React.Component {
    static defaultProps = {
        users: [],
    };
    constructor(props, context) {
        super(props, context);
        this.columns = [
            {
                title: 'Username',
                dataIndex: 'username',
                onFilter: (value, record) => record.username.indexOf(value) === 0,
                sorter: (a, b) => utils.stringOrder(a, b),
            },
            {
                title: 'Name',
                dataIndex: 'name',
                onFilter: (value, record) => record.name.indexOf(value) === 0,
                sorter: (a, b) => utils.stringOrder(a, b),
            },
            {
                title: 'Role',
                dataIndex: 'role',
                onFilter: (value, record) => record.role.indexOf(value) === 0,
                sorter: (a, b) => utils.stringOrder(a, b),
                filters: utils.rolesFilter,
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
            paginationText: 'Show All',
            loading: false,
            visible: false,
            confirmLoading: false,
            errorCreate: null,

            userForm: {
                username: '',
                password: '',
                role: 'super',
                name: '',
            },

        };
    }

    componentDidMount() {
        this.props.actions.checkAuth(this.props.auth);
        this.props.actions.getUsers();
    }
    unloadButton() {
        this.setState({ confirmLoading: false });
    }
    showModal = () => {
        this.setState({ visible: true });
    };
    handleCancel = () => {
        this.setState({ visible: false });
    };
    handleCreate = () => {
        this.setState({ confirmLoading: true });
        this.form.validateFields((err, values) => {
            if (!err) {
                const userForm = this.state.userForm;
                userForm.username = values.username;
                userForm.password = values.password;
                userForm.name = values.name;

                this.setState({ userForm });
                this.sendForm();
            } else {
                this.setState({ confirmLoading: false });
            }
        });
    };
    saveFormRef = form => {
        this.form = form;
    };
    sendForm = () => {
        this.props.actions.createNewUser(this.state.userForm).then(
            data => {
                if (data) {
                    this.setState({ visible: false });
                    this.form.resetFields();
                }
            },
            error => {
                this.setState({ errorCreate: { ...error } });
            }

        );
        this.unloadButton();
    }


    handleSelectChange = value => {
        const userForm = this.state.userForm;
        userForm.role = value;
        this.setState({ userForm });
    };


    showAll = () => {
        if (!(this.state.pagination)) {
            this.setState({ pagination: {}, paginationText: 'Show All' });
        } else {
            this.setState({ pagination: false, paginationText: 'Paginate Table' });
        }
    };
    render() {
        const { visible, confirmLoading, loading, pagination } = this.state;

        const { createError, users } = this.props;
        return (
            <div>
                <Button.Group size="default">
                    <Button type="primary" onClick={this.showModal}>Create an User</Button>
                    <Button type="primary" onClick={this.showAll}>{this.state.paginationText}</Button>
                </Button.Group>


                <UserCreateForm
                    ref={this.saveFormRef}
                    visible={visible}
                    onCancel={this.handleCancel}
                    confirmLoading={confirmLoading}
                    onCreate={this.handleCreate}
                    onChange={value => this.handleSelectChange(value)}
                    createError={createError}

                />

                <Table
                    columns={this.columns}
                    rowKey={record => record.id}
                    dataSource={users.rows}
                    pagination={pagination}
                    loading={loading}
                />
            </div>
        );
    }
}
User.propTypes = {
    auth: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    users: PropTypes.array,
    checkAuth: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(User);
