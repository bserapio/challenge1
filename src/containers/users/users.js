import React from 'react';
import PropTypes from 'prop-types';

import { Button, Table } from 'antd';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import UserCreateForm from '../../components/modals/createUserForm';

import * as userAc from '../../ducks/modules/user';
import './user.css';

const utils = require('../../utils/');

const mapStateToProps = state => ({
    users: state.user.users,
    auth: state.auth.auth,
    config: state.common.config,
    createError: state.user.createError,
});

const mapDispatchToProps = dispatch => ({
    userActions: bindActionCreators(userAc, dispatch),
});


class User extends React.Component {

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
        const { userActions } = this.props;

        userActions.getUserAction();
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
        const { userForm } = this.state;
        this.setState({ confirmLoading: true });
        this.form.validateFields((err, values) => {
            if (!err) {
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
        const { userActions } = this.props;
        const { userForm } = this.state;
        userActions.createUserAction(userForm).then(
            data => {
                if (data) {
                    this.setState({ visible: false });
                    userActions.getUserAction();
                    this.form.resetFields();
                }
            },
            error => {
                this.setState({ errorCreate: { ...error } });
            }

        );
        this.unloadButton();
    };


    handleSelectChange = value => {
        const { userForm } = this.state;
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
        const { visible, confirmLoading, loading, pagination, paginationText } = this.state;

        const { createError, users, config } = this.props;
        return (
            <div>
                <Button.Group size="default">
                    <Button type="primary" onClick={this.showModal}>Create an User</Button>
                    <Button type="primary" onClick={this.showAll}>{paginationText}</Button>
                </Button.Group>


                <UserCreateForm
                    ref={this.saveFormRef}
                    visible={visible}
                    onCancel={this.handleCancel}
                    confirmLoading={confirmLoading}
                    onCreate={this.handleCreate}
                    onChange={value => this.handleSelectChange(value)}
                    createError={createError}
                    config={config}

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
    userActions: PropTypes.object.isRequired,
    createError: PropTypes.object,
    config: PropTypes.object.isRequired,
    users: PropTypes.array,
};

User.defaultProps = {

    users: [],
    auth: [],
    createError: null,

};

export default connect(mapStateToProps, mapDispatchToProps)(User);
