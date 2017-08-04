
import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Table, Icon, Input, Popconfirm, Button } from 'antd';
import ClientCreateForm from '../../components/modals/createClientForm';
import UpdateClientForm from '../../components/modals/updateClientForm';
import ElevatePrigilegesForm from '../../components/modals/elevatePrivileges';

import * as userAc from '../../ducks/modules/user';
import * as authAc from '../../ducks/modules/auth';
import * as clientAc from '../../ducks/modules/client';
import * as commonAc from '../../ducks/modules/common';
import './client.css';

const env = process.env.NODE_ENV || 'development';
const configParams = require('../../config/config')[env];


const utils = require('../../utils/');

const mapDispatchToProps = dispatch => ({
    userActions: bindActionCreators(userAc, dispatch),
    clientActions: bindActionCreators(clientAc, dispatch),
    commonActions: bindActionCreators(commonAc, dispatch),
    authActions: bindActionCreators(authAc, dispatch),
});

const mapStateToProps = state => {
    const reg = new RegExp(state.client.searchText, 'gi');
    let clients;
    if (state.client.searchText !== '' && state.client.searchText) {
        clients = state.client.clients.map(record => {
            const match = record.identifier.match(reg);
            if (match) {
                return {
                    ...record,
                    identifier: (
                        <span>
                            {
                                record.identifier.split(reg).map((text, i) => (
                                    i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
                                ))
                            }
                        </span>
                    ),
                };
            }
            return null;
        });
        clients = clients.filter(utils.removeUndefined);
    } else {
        clients = state.client.clients;
    }
    const users = {};
    state.user.users.forEach(item => {
        const id = item.id;
        const username = item.username;
        const x = {};
        x[id] = username;
        Object.assign(users, x);
    });

    return {
        auth: state.auth.auth,
        config: state.common.config,
        clients,
        users,
    };
};
class Clients extends React.Component {
    state = {
        visible: {
            elevate: false,
            create: false,
            update: false,
        },
        formLoading: {
            elevate: false,
            create: false,
            update: false,
        },
        elevatorForm: {
            password: '',
            username: '',
            identifier: '',
        },
        clientForm: {
            identifier: '',
            name: '',
            lang: 'en',
            type: 'demo',
        },
        paginationText: 'Show All',
        editedRecord: {},
        pagination: {},
        elevateUrl: null,
        footer: null,
        loading: false,
        filterDropdownVisible: false,
        searchText: '',
        filtered: false,
    };
    componentDidMount() {
        const { authActions } = this.props;
        authActions.checkAuthAction();
    }


    componentWillReceiveProps(nextProps) {
        const { userActions, clientActions, commonActions, auth, config } = this.props;
        if (!config) {
            commonActions.getConfigAction();
        }
        if (nextProps.auth !== auth) {
            const role = nextProps.auth.role;
            if (config && config.acl.managerGroup.indexOf(role) !== -1) {
                userActions.getUserAction();
            }
            clientActions.getClientAction();
        }
    }


    // Search Filter
    onSearch = () => {
        const { clientActions } = this.props;
        clientActions.searchFilter(this.state.searchText);
    };
    onInputChange = e => {
        if (e) {
            this.setState({ searchText: e.target.value });
        }
    };


    // Create User
    showCreateModal = () => {
        const { visible } = this.state;
        visible.create = true;
        this.setState({ visible });
    };
    saveFormRef = form => {
        this.form = form;
    };
    handleCreateCancel = () => {
        const { visible, formLoading } = this.state;
        visible.create = false;
        formLoading.create = false;
        this.setState({ visible, formLoading });
    };
    handleCreate = () => {
        const { formLoading, clientForm } = this.state;
        formLoading.create = true;
        this.setState({ formLoading });
        this.form.validateFields((err, values) => {
            if (err) {
                formLoading.create = false;
                this.setState({ formLoading });
            } else {
                clientForm.identifier = values.identifier;
                clientForm.name = values.name;
                this.setState({ clientForm }, this.sendCreateForm(this.form));
            }
        });
    };
    handleSelectLanguageChange = value => {
        const { clientForm } = this.state;
        clientForm.lang = value;
        this.setState({ clientForm, confirmLoading: false });
    };
    handleSelectTypeChange = value => {
        const { clientForm } = this.state;
        clientForm.type = value;
        this.setState({ clientForm, confirmLoading: false });
    };
    sendCreateForm = form => {
        const { clientActions } = this.props;
        const { visible, clientForm, formLoading } = this.state;
        clientActions.createClientAction(clientForm).then(
            () => {
                visible.create = false;
                formLoading.create = false;
                this.setState({ visible, formLoading });
                form.resetFields();
                clientActions.getClientAction();
            },
            err => {
                console.log(err);
            }
        );
    };

    // Update User
    showUpdateModal = record => {
        const { visible } = this.state;
        visible.update = true;
        const editedRecord = { ...record };
        this.setState({ visible, editedRecord });
    };
    saveFormRefUpdate = form => {
        this.formUpdate = form;
    };
    changeUpdateRecord = record => {
        let { editedRecord } = this.state;
        editedRecord = { ...record };
        this.setState({ editedRecord });
    };

    editDone(newRecord, record, key, type) {
        const { clientActions } = this.props;
        let method = null;
        if (type === 'save') {
            if (newRecord !== record) {
                switch (key) {
                    case 'active': {
                        method = 'active';
                        break;
                    }
                    case 'maintenance': {
                        method = 'maintenance';
                        break;
                    }
                    case 'auto_update': {
                        method = 'autoUpdate';
                        break;
                    }

                    case 'client_metas#new_invoice': {
                        method = 'invoice';
                        break;
                    }
                    case 'client_metas#new_channel': {
                        method = 'channel';
                        break;
                    }


                    case 'client_metas#ikentoo': {
                        method = 'ikentoo';
                        break;
                    }
                    default: {
                        method = null;
                        break;
                    }

                }
                if (method) {
                    clientActions.updateClientActionBooleanAction(newRecord, method).then(
                        () => {
                            clientActions.getClientAction();
                        }
                    );
                }
            }
        } else {
            this.setState({ editedRecord: {} });
        }
    }

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
    handleUpdateCancel = () => {
        const { formLoading, visible } = this.state;
        visible.update = false;
        formLoading.update = false;
        this.setState({ visible, formLoading });
    };
    handleUpdateCreate = () => {
        const { formLoading, editedRecord, visible } = this.state;
        const { clientActions } = this.props;
        formLoading.update = true;
        this.setState({ formLoading });
        this.formUpdate.validateFields((err, values) => {
            if (err) {
                formLoading.update = false;
                this.setState({ formLoading });
            } else {
                editedRecord.name = values.name;
                formLoading.update = true;
                clientActions.updateClientAction(editedRecord).then(
                    () => {
                        visible.update = false;
                        formLoading.update = false;
                        this.setState({ visible, formLoading });
                        clientActions.getClientAction();
                    },
                    errReq => {
                        console.log(errReq);
                    }
                );
            }
        });
    };

    // Elevator
    saveFormRefElevator = form => {
        this.formElevator = form;
    };
    handleElevateCreate = () => {
        const { elevatorForm, formLoading } = this.state;
        const { auth } = this.props;
        formLoading.create = true;

        this.setState({ formLoading });

        this.formElevator.validateFields((err, values) => {
            if (err) {
                formLoading.elevate = false;
                this.setState({ formLoading });
            } else {
                elevatorForm.password = values.password;
                elevatorForm.username = auth.username;
                this.setState({ elevatorForm }, this.sendElevatorForm);
                this.formElevator.resetFields();
            }
        });
    };
    sendElevatorForm() {
        const { clientActions } = this.props;
        const { elevatorForm, formLoading } = this.state;
        clientActions.checkElevateAction(elevatorForm).then(
            res => {
                const key = res.payload.data.key;
                const elevateUrl = {
                    key,
                    identifier: elevatorForm.identifier,
                };
                formLoading.elevate = false;
                this.setState({ elevateUrl, formLoading });
            },
            err => {
                console.log(err);
            }
        );
    }
    showElevateModal = record => {
        const { elevatorForm, visible } = this.state;
        // let { elevateUrl } = this.state;
        elevatorForm.identifier = record.identifier;
        visible.elevate = true;
        const elevateUrl = null;
        this.setState({ visible, elevatorForm, elevateUrl });
    };
    handleElevateCancel = () => {
        const { visible } = this.state;
        visible.elevate = false;
        this.setState({ visible });
    };
    remove = record => {
        const { clientActions } = this.props;
        clientActions.removeClientAction(record).then(() => {
            clientActions.getClientAction();
        });
    };


    showAll = () => {
        if (!(this.state.pagination)) {
            this.setState({ pagination: {}, paginationText: 'Show All' });
        } else {
            this.setState({ pagination: false, paginationText: 'Paginate Table' });
        }
    };
    openChannelSettings = (identifier, type) => {
        const key = utils.generateKey(identifier);
        let url;
        if (type === 'ikentoo') {
            url = `${configParams.ikentoo + key}&opcode=${identifier}`;
        } else if (type === 'channel') {
            url = `${configParams.channel + key}&opcode=${identifier}`;
        }
        return window.open(url);
    };

    renderColumns(data, index, key, text, type, aclObject) {
        const { auth, users } = this.props;

        let extraButton = null;
        if (!data) {
            return text;
        } else if (Object.keys(data[index]).length === 0) {
            return text;
        }

        if (type === 'boolean') {
            let element = null;
            if (key === 'client_metas#new_channel') {
                if (aclObject.indexOf(auth.role) !== -1) {
                    extraButton = (<Button
                        type="primary"
                        icon="setting"
                        className="black"
                        key="newChannel"
                        onClick={() => this.openChannelSettings(data[index].identifier, 'channel')}
                    />);
                }
            }
            if (key === 'client_metas#ikentoo') {
                if (aclObject.indexOf(auth.role) !== -1) {
                    extraButton = (<Button
                        type="primary"
                        icon="setting"
                        className="black"
                        key="ikentoo"
                        onClick={() => this.openChannelSettings(data[index].identifier, 'ikentoo')}
                    />);
                }
            }

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
        if (key === 'client_metas#user_id') {
            return users[text];
        }
        return text;
    }
    render() {
        const { clients, auth, config, users, commonActions } = this.props;
        let acl;
        try {
            acl = config.acl;
        } catch (err) {
            commonActions.getConfigAction();
        }


        const {
            searchText,
            filterDropdownVisible,
            paginationText,
            filtered,
            editedRecord,
            visible,
            formLoading,
            elevateUrl,
            pagination,
            loading,
        } = this.state;

        const columns = [
            {
                title: 'Actions',
                dataIndex: 'actions',
                onFilter: (value, record) => record.role.indexOf(value) === 0,
                render: (text, record) => {
                    if (Object.keys(record).length === 0) {
                        return null;
                    }

                    return (
                        <Button.Group size="small">
                            <Button type="primary" onClick={() => this.showUpdateModal(record)}>Edit</Button>
                            {acl.managerGroup.indexOf(auth.role) !== -1 &&
                            <Button type="primary" onClick={() => this.showElevateModal(record)}>Connect</Button>
                            }
                            {acl.adminGroup.indexOf(auth.role) !== -1 &&
                            <Popconfirm
                                placement="top"
                                title="Do you want to delete the client?"
                                onConfirm={() => this.remove(record)}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button type="danger">Delete</Button>
                            </Popconfirm>
                            }
                        </Button.Group>
                    );
                },
            },
            {
                title: 'identifier',
                dataIndex: 'identifier',
                filterDropdown: (
                    <div className="custom-filter-dropdown">
                        <Input
                            ref={ele => {
                                this.searchInput = ele;
                            }}
                            placeholder="Search name"
                            value={searchText}
                            onChange={this.onInputChange}
                            onPressEnter={this.onSearch}
                        />
                        <Button type="primary" onClick={this.onSearch}>Search</Button>
                    </div>
                ),
                filterIcon: <Icon type="filter" style={{ color: filtered ? '#108ee9' : '#aaa' }} />,
                filterDropdownVisible,
                onFilterDropdownVisibleChange: vis => {
                    this.setState({ filterDropdownVisible: vis }, () => this.searchInput.focus());
                },
            },
            {
                title: 'Name',
                dataIndex: 'name',
                onFilter: (value, record) => record.role.indexOf(value) === 0,
                sorter: (a, b) => utils.stringOrder(a, b, 'name'),
                render: (text, record, index) => this.renderColumns(clients, index, 'name', text, 'text', acl.userGroup),
            },
            {
                title: 'Lang',
                dataIndex: 'lang',
                key: 'lang',
                filters: utils.langFilter,
                onFilter: (value, record) => record.lang.indexOf(value) === 0,
                render: (text, record, index) => this.renderColumns(clients, index, 'lang', text, 'text', acl.userGroup),

            },
            {
                title: 'Active',
                dataIndex: 'active',
                key: 'active',
                render: (text, record, index) => this.renderColumns(clients, index, 'active', text, 'boolean', acl.userGroup),

            },
            {
                title: 'Manteinance',
                dataIndex: 'maintenance',
                key: 'maintenance',
                render: (text, record, index) => this.renderColumns(clients, index, 'maintenance', text, 'boolean', acl.userGroup),
            },
            {
                title: 'AutoUpdate',
                dataIndex: 'auto_update',
                key: 'auto_update',
                render: (text, record, index) => this.renderColumns(clients, index, 'auto_update', text, 'boolean', acl.managerGroup),

            },
            {
                title: 'new_invoice',
                dataIndex: 'client_metas#new_invoice',
                key: 'client_metas#new_invoice',
                render: (text, record, index) => this.renderColumns(clients, index, 'client_metas#new_invoice', text, 'boolean', acl.managerGroup),

            },
            {
                title: 'channel_manager',
                dataIndex: 'client_metas#new_channel',
                key: 'client_metas#new_channel',
                render: (text, record, index) => this.renderColumns(clients, index, 'client_metas#new_channel', text, 'boolean', acl.managerGroup),

            },
            {
                title: 'ikentoo',
                dataIndex: 'client_metas#ikentoo',
                key: 'client_metas#ikentoo',
                render: (text, record, index) => this.renderColumns(clients, index, 'client_metas#ikentoo', text, 'boolean', acl.managerGroup),

            },
            {
                title: 'expireDate',
                dataIndex: 'expire_date',
                render: (text, record, index) => this.renderColumns(clients, index, 'expire_date', text, 'datetime'),
            },
            {
                title: 'Type',
                dataIndex: 'client_metas#type',
                onFilter: (value, record) => record['client_metas#type'].indexOf(value) === 0,
                render: (text, record, index) => this.renderColumns(clients, index, 'client_metas#type', text, 'text'),
                filters: utils.typeFilter,

            },
            {
                title: 'user',
                dataIndex: 'client_metas#user_id',
                key: 'client_metas#user_id',
                render: (text, record, index) => this.renderColumns(clients, index, 'client_metas#user_id', text, 'text'),

            },
        ];

        return (
            <div>

                <Button.Group size="default">
                    <Button type="primary" onClick={this.showCreateModal}>Create an Client</Button>
                    <Button type="primary" onClick={this.showAll}>{paginationText}</Button>
                </Button.Group>


                <ClientCreateForm
                    ref={this.saveFormRef}
                    visible={visible.create}
                    config={config}
                    onCancel={this.handleCreateCancel}
                    confirmLoading={formLoading.create}
                    onCreate={this.handleCreate}
                    onLanguageChange={value => this.handleSelectLanguageChange(value)}
                    onTypeChange={value => this.handleSelectTypeChange(value)}
                />


                <ElevatePrigilegesForm
                    ref={this.saveFormRefElevator}
                    visible={visible.elevate}
                    config={config}
                    onElevatorCancel={this.handleElevateCancel}
                    confirmElevatorLoading={formLoading.elevate}
                    onElevatorCreate={this.handleElevateCreate}
                    modalText={elevateUrl}
                />


                <UpdateClientForm
                    ref={this.saveFormRefUpdate}
                    visible={visible.update}
                    config={config}
                    onUpdateCancel={this.handleUpdateCancel}
                    confirmUpdateLoading={formLoading.update}
                    onUpdateCreate={this.handleUpdateCreate}
                    modalText={elevateUrl}
                    record={editedRecord}
                    users={users}
                    changeUpdateRecord={record => this.changeUpdateRecord(record)}
                />

                <Table
                    columns={columns}
                    rowKey={record => record.id}
                    dataSource={clients}
                    pagination={pagination}
                    loading={loading}

                />
            </div>
        );
    }

}


Clients.propTypes = {
    userActions: PropTypes.object.isRequired,
    clientActions: PropTypes.object.isRequired,
    commonActions: PropTypes.object.isRequired,
    authActions: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,
    clients: PropTypes.array,
    users: PropTypes.array,
    auth: PropTypes.object,
};

Clients.defaultProps = {
    clients: [],
    users: [],
    auth: {},

};
export default connect(mapStateToProps, mapDispatchToProps)(Clients);
