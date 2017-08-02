import React from 'react';
import PropTypes from 'prop-types';

import { Button, Table, Popconfirm, Icon } from 'antd';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import UserCreateForm from '../../components/modals/createUserForm';
import UpdateCreateForm from '../../components/modals/updateUserForm';

import * as userAc from '../../ducks/modules/user';
import * as authAc from '../../ducks/modules/auth';
import * as commonAc from '../../ducks/modules/common';
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
    authActions: bindActionCreators(authAc, dispatch),
    commonActions: bindActionCreators(commonAc, dispatch),
});


class User extends React.Component {

    state = {
        data: [],
        pagination: {},
        paginationText: 'Show All',
        loading: false,
        visible: {
            create:false,
            update:false
        },
        confirmLoading:{
            create:false,
            update:false
        },
        errorCreate: null,

        userForm: {
            username: '',
            password: '',
            role: 'super',
            name: '',
        },

    };


    componentDidMount() {
        const { userActions, authActions } = this.props;
        authActions.checkAuthAction();

        userActions.getUserAction();
    }
    unloadButton() {
        this.setState({ confirmLoading: false });
    }
    showCreateModal = () => {
        const {visible} = this.state;
        visible.create = true;
        this.setState(visible);
    };

    showUpdateModal = () => {
        const {visible} = this.state;
        visible.update = true;
        this.setState(visible);
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

    updateFormRef = form => {
        this.updateForm = form;
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
    updateRecord = (record, key) => {
        const newRecord = { ...record };
        const newKey = key.split('#');
        if (newKey.length === 1) {
            newRecord[newKey[0]] = record[key] !== true;
        } else if ((newKey.length === 2)) {
            newRecord[newKey[0]][newKey[1]] = record[key] !== true;
        } else {
            newRecord[newKey[0]][newKey[1]][newKey[2]] = record[key] !== true;
        }


        this.editDone(newRecord, record, key, 'save');
    };

    editDone(newRecord, record, key, type) {
        const { userActions } = this.props;
        let method = null;
        if (type === 'save') {
            if (newRecord !== record) {
                switch (key) {
                    case 'isActive': {
                        method = 'active';
                        break;
                    }
                    case 'delete': {
                        method = 'delete';
                        break;
                    }

                    default: {
                        method = null;
                        break;
                    }

                }
                if (method) {
                    userActions.updateUserActionBooleanAction(newRecord, method).then(
                        () => {
                            userActions.getUserAction();
                        }
                    );
                }
            }
        } else {
            this.setState({ editedRecord: {} });
        }
    }

    renderColumns(data, index, key, text, type, aclObject) {
        const { auth } = this.props;

        const extraButton = null;
        if (!data) {
            return text;
        } else if (Object.keys(data[index]).length === 0) {
            return text;
        }
        if (type === 'boolean') {
            let element = null;

            if (data[index][key] === true) {
                if (aclObject.indexOf(auth.role) === -1) {
                    element = (<Icon type="check" />);
                } else {
                    element = (

                        <Popconfirm
                            placement="top"
                            title="Do you want to deactivate it?"
                            onConfirm={() => this.updateRecord(data[index], key)}
                            okText="Yes"
                            cancelText="No"
                            key="deletePopup"
                        >
                            <Button type="primary" icon="check" className="active" />
                        </Popconfirm>);
                }
            } else if (aclObject.indexOf(auth.role) === -1) {
                element = (<Icon type="close" />);
            } else {
                element = (<Popconfirm
                    placement="top"
                    title="Do you want to activate it?"
                    onConfirm={() => this.updateRecord(data[index], key)}
                    okText="Yes"
                    cancelText="No"
                    key="popConfirm"
                ><Button type="primary" icon="close" className="inactive" />
                </Popconfirm>);
            }

            return [element, extraButton];
        }
        return text;
    }


    render() {
        const { visible, confirmLoading, loading, pagination, paginationText } = this.state;

        const { createError, users, config, commonActions } = this.props;

        let acl;
        try {
            acl = config.acl;
        } catch (err) {
            commonActions.getConfigAction();
        }


        const columns = [
            {
                title: 'Actions',
                dataIndex: 'actions',
                onFilter: (value, record) => record.role.indexOf(value) === 0,
                render: (text, record) => {
                    if (Object.keys(record).length === 0) {
                        return null;
                    }
                    if ( record.deletedAt) {
                        return null;
                    }

                    return (
                        <Button.Group size="small">
                            <Button type="primary" onClick={() => this.showUpdateModal(record)}>Edit</Button>

                            <Popconfirm
                                placement="top"
                                title="Do you want to delete the client?"
                                onConfirm={() => this.updateRecord(record,'delete')}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button type="danger">Delete</Button>
                            </Popconfirm>

                        </Button.Group>
                    );
                },
            },

            {
                title: 'Username',
                dataIndex: 'username',
                onFilter: (value, record) => record.username.indexOf(value) === 0,
                sorter: (a, b) => utils.stringOrder(a, b, 'username'),
                render: (text, record, index) => this.renderColumns(users.rows, index, 'username', text, 'text', acl.adminGroup),
            },
            {
                title: 'Name',
                dataIndex: 'name',
                onFilter: (value, record) => record.name.indexOf(value) === 0,
                sorter: (a, b) => utils.stringOrder(a, b, 'name'),
                render: (text, record, index) => this.renderColumns(users.rows, index, 'name', text, 'text', acl.adminGroup),
            },
            {
                title: 'Role',
                dataIndex: 'role',
                onFilter: (value, record) => record.role.indexOf(value) === 0,
                sorter: (a, b) => utils.stringOrder(a, b, 'role'),
                filters: utils.rolesFilter,
                render: (text, record, index) => this.renderColumns(users.rows, index, 'role', text, 'text', acl.adminGroup),
            },
            {
                title: 'isActive',
                dataIndex: 'isActive',
                render: (text, record, index) => this.renderColumns(users.rows, index, 'isActive', text, 'boolean', acl.adminGroup),
            },
            {
                title: 'Created',
                dataIndex: 'createdAt',
                render: (text, record, index) => this.renderColumns(users.rows, index, 'createdAt', text, 'datetime'),
            },
            {
                title: 'Modified',
                dataIndex: 'modifiedAt',
                render: (text, record, index) => this.renderColumns(users.rows, index, 'modifiedAt', text, 'datetime'),
            },

            {
                title: 'Deleted',
                dataIndex: 'deletedAt',
                render: (text, record, index) => this.renderColumns(users.rows, index, 'deletedAt', text, 'datetime'),
            },

        ];

        return (
            <div>
                <Button.Group size="default">
                    <Button type="primary" onClick={this.showCreateModal}>Create an User</Button>
                    <Button type="primary" onClick={this.showAll}>{paginationText}</Button>
                </Button.Group>


                <UserCreateForm
                    ref={this.saveFormRef}
                    visible={visible.create}
                    onCancel={this.handleCancel}
                    confirmLoading={confirmLoading.create}
                    onCreate={this.handleCreate}
                    onChange={value => this.handleSelectChange(value)}
                    createError={createError}
                    config={config}

                />
                <UpdateCreateForm
                    ref={this.updateFormRef}
                    visible={visible.update}
                    onCancel={this.handleUpdateCancel}
                    confirmLoading={confirmLoading.update}
                    onCreate={this.handleUpdateCreate}
                    onChange={value => this.handleSelectChange(value)}
                    createError={createError}
                    config={config}

                />



                <Table
                    columns={columns}
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
    authActions: PropTypes.object.isRequired,
    commonActions: PropTypes.object.isRequired,
    createError: PropTypes.object,
    config: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired,
    auth: PropTypes.object,
};

User.defaultProps = {

    users: {},
    auth: {},
    createError: null,

};

export default connect(mapStateToProps, mapDispatchToProps)(User);
