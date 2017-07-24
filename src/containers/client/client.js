
import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Table, Icon, Input, Popconfirm, Button } from 'antd';
import ClientCreateForm from '../../components/modals/createClientForm';
import UpdateClientForm from '../../components/modals/updateClientForm';
import ElevatePrigilegesForm from '../../components/modals/elevatePrivileges';

import * as appActions from '../../actions/appActions';
import './client.css';


const utils = require('../../utils/');
const acl = require('../../config/acl_groups');


const mapDispatchToProps = dispatch => ({

    actions: bindActionCreators(appActions, dispatch),

});


const removeUndefined = value => {
    if (value) {
        return true;
    }
    return false;
};


const mapStateToProps = state => {
    const reg = new RegExp(state.app.searchText, 'gi');
    let clients;
    if (state.app.searchText !== '' && state.app.searchText) {
        clients = state.app.clients.rows.map(record => {
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
        clients = clients.filter(removeUndefined);
    } else {
        clients = state.app.clients.rows;
    }


    return {
        auth: state.app.auth,
        users: state.app.users,
        clients,
    };
};


class Clients extends React.Component {


    constructor(props, context) {
        super(props, context);
        this.state = {
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
    }
    componentDidMount() {
        const auth = utils.checkAuth();

        if (auth) {
            this.props.actions.getUsers(auth.role);
            this.props.actions.getClientAction();
        }
    }

    componentWillReceiveProps(nextProps) {


    }


    // Search Filter
    onSearch = () => {
        const { actions } = this.props;
        actions.searchFilter(this.state.searchText);
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
        const { actions } = this.props;
        const { visible, clientForm, formLoading } = this.state;
        actions.createClient(clientForm).then(
            () => {
                visible.create = false;
                formLoading.create = false;
                this.setState({ visible, formLoading });
                form.resetFields();
            },
            err => {
                console.log(err);
            }
        );
    };

    // Update User
    showUpdateModal = record => {
        let { visible, editedRecord } = this.state;
        visible.update = true;
        editedRecord = { ...record };
        this.setState({ visible, editedRecord });
    }
    saveFormRefUpdate = form => {
        this.formUpdate = form;
    };
    changeUpdateRecord = record => {
        let { editedRecord } = this.state;
        editedRecord = { ...record };
        this.setState({ editedRecord });
    }

    editDone(newRecord, record, key, type) {
        const {actions} = this.props;
        if (type === 'save') {
            if (newRecord !== record) {
                switch (key) {


                    case 'active': {
                        actions.updateActiveClient(newRecord).then(data => data, error => error);

                        break;
                    }
                    case 'maintenance': {
                        actions.updateManteinanceClient(newRecord).then(data => data, error => error);
                        break;
                    }
                    case 'autoUpdate': {
                        actions.updateAutoUpdateClient(newRecord).then(data => data, error => error);
                        break;
                    }

                    case 'ClientMetum#newInvoice': {
                        actions.updateInvoiceClient(newRecord).then(data => data, error => error);
                        break;
                    }
                    case 'ClientMetum#newChannel': {
                        actions.updateChannelClient(newRecord).then(data => data, error => error);
                        break;
                    }


                    case 'ClientMetum#ikentoo': {
                        actions.updateIkentooClient(newRecord).then(data => data, error => error);
                        break;
                    }

                    default: {
                        actions.updateClient(newRecord).then(data => data, error => error);
                    }
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
        const {actions} = this.props;
        formLoading.update = true;
        this.setState({ formLoading });

        this.formUpdate.validateFields((err, values) => {
            if (err) {
                formLoading.update = false;
                this.setState({ formLoading });
            } else {
                editedRecord.name = values.name;
                formLoading.update = true;
                actions.updateClient(editedRecord).then(
                    () => {
                        visible.update = false;
                        formLoading.update = false;
                        this.setState({ visible, formLoading });
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
        formLoading.create = true;

        this.setState({ formLoading });

        this.formElevator.validateFields((err, values) => {
            if (err) {
                formLoading.elevate = false;
                this.setState({ formLoading });
            } else {
                elevatorForm.password = values.password;
                elevatorForm.username = this.props.auth.username;
                this.setState({ elevatorForm }, this.sendElevatorForm);
                this.formElevator.resetFields();
            }
        });
    };
    sendElevatorForm() {
        const { actions } = this.props;
        const { elevatorForm, formLoading } = this.state;
        actions.checkElevateClient(elevatorForm).then(
            res => {
                const elevateUrl = {
                    key: res.key,
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
        const { actions } = this.props;
        actions.removeClient(record);
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
            url = `https://app.base7booking.com/ikentoo/admin/panel?key=${key}&opcode=${identifier}`;
        } else if (type === 'channel') {
            url = `https://app.base7booking.com/channel/admin/panel?key=${key}&opcode=${identifier}`;
        }
        return window.open(url);
    };

    renderColumns(data, index, key, text, type, aclObject) {
        const {auth} = this.props;

        let extraButton = null;
        if (!data) {
            return text;
        } else if (Object.keys(data[index]).length === 0) {
            return text;
        }
        if (type === 'boolean') {
            let element = null;
            if (key === 'ClientMetum#newChannel') {
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
            if (key === 'ClientMetum#ikentoo') {
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
                    element = (<Icon type="check"/>);
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
                            <Button type="primary" icon="check" className="active"/>
                        </Popconfirm>);
                }
            } else if (aclObject.indexOf(auth.role) === -1) {
                element = (<Icon type="close"/>);
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
        const {clients, auth} = this.props;


        const { searchText, filterDropdownVisible,
            paginationText,
            filtered,
            editedRecord,
            visible,
            formLoading,
            elevateUrl,
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
                            {acl.managerGroups.indexOf(auth.role) !== -1 &&
                            <Button type="primary" onClick={() => this.showElevateModal(record)}>Connect</Button>
                            }
                            {acl.adminGroups.indexOf(auth.role) !== -1 &&
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
                sorter: (a, b) => utils.stringOrder(a, b),
                render: (text, record, index) => this.renderColumns(clients, index, 'name', text, 'text', acl.userGroups),
            },
            {
                title: 'Lang',
                dataIndex: 'lang',
                key: 'lang',
                filters: utils.langFilter,
                onFilter: (value, record) => record.lang.indexOf(value) === 0,
                render: (text, record, index) => this.renderColumns(clients, index, 'lang', text, 'text', acl.userGroups),

            },
            {
                title: 'Active',
                dataIndex: 'active',
                key: 'active',
                render: (text, record, index) => this.renderColumns(clients, index, 'active', text, 'boolean', acl.userGroups),

            },
            {
                title: 'Manteinance',
                dataIndex: 'maintenance',
                key: 'maintenance',
                render: (text, record, index) => this.renderColumns(clients, index, 'maintenance', text, 'boolean', acl.userGroups),
            },
            {
                title: 'AutoUpdate',
                dataIndex: 'autoUpdate',
                key: 'autoUpdate',
                render: (text, record, index) => this.renderColumns(clients, index, 'autoUpdate', text, 'boolean', acl.managerGroups),

            },
            {
                title: 'new_invoice',
                dataIndex: 'ClientMetum#newInvoice',
                key: 'ClientMetum#newInvoice',
                render: (text, record, index) => this.renderColumns(clients, index, 'ClientMetum#newInvoice', text, 'boolean', acl.managerGroups),

            },
            {
                title: 'channel_manager',
                dataIndex: 'ClientMetum#newChannel',
                key: 'ClientMetum#newChannel',
                render: (text, record, index) => this.renderColumns(clients, index, 'ClientMetum#newChannel', text, 'boolean', acl.managerGroups),

            },
            {
                title: 'ikentoo',
                dataIndex: 'ClientMetum#ikentoo',
                key: 'ClientMetum#ikentoo',
                render: (text, record, index) => this.renderColumns(clients, index, 'ClientMetum#ikentoo', text, 'boolean', acl.managerGroups),

            },
            {
                title: 'expireDate',
                dataIndex: 'expireDate',
                render: (text, record, index) => this.renderColumns(clients, index, 'expireDate', text, 'datetime'),
            },
            {
                title: 'Type',
                dataIndex: 'ClientMetum#type',
                onFilter: (value, record) => record['ClientMetum#type'].indexOf(value) === 0,
                render: (text, record, index) => this.renderColumns(clients, index, 'ClientMetum#type', text, 'text'),
                filters: utils.typeFilter,

            },
            {
                title: 'user',
                dataIndex: 'ClientMetum#User#username',
                key: 'ClientMetum#User#username',
                render: (text, record, index) => this.renderColumns(clients, index, 'ClientMetum#User#username', text, 'text'),

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
                    onCancel={this.handleCreateCancel}
                    confirmLoading={formLoading.create}
                    onCreate={this.handleCreate}
                    onLanguageChange={value => this.handleSelectLanguageChange(value)}
                    onTypeChange={value => this.handleSelectTypeChange(value)}
                />


                <ElevatePrigilegesForm
                    ref={this.saveFormRefElevator}
                    visible={visible.elevate}
                    onElevatorCancel={this.handleElevateCancel}
                    confirmElevatorLoading={formLoading.elevate}
                    onElevatorCreate={this.handleElevateCreate}
                    modalText={elevateUrl}
                />


                <UpdateClientForm
                    ref={this.saveFormRefUpdate}
                    visible={visible.update}
                    onUpdateCancel={this.handleUpdateCancel}
                    confirmUpdateLoading={formLoading.update}
                    onUpdateCreate={this.handleUpdateCreate}
                    modalText={elevateUrl}
                    record={editedRecord}
                    users={this.props.users}
                    changeUpdateRecord={record => this.changeUpdateRecord(record)}
                />

                <Table
                    columns={columns}
                    rowKey={record => record.id}
                    dataSource={clients}
                    pagination={this.state.pagination}
                    loading={this.state.loading}

                />
            </div>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Clients);
