
import React from 'react';
import PropTypes from 'prop-types';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Table, Icon, Input, Popconfirm, Button} from 'antd';
import ClientCreateForm from '../../components/modals/createClientForm';
import UpdateClientForm from '../../components/modals/updateClientForm';

import ElevatePrigilegesForm from '../../components/modals/elevatePrivileges';
import * as userActions from '../../actions/userActions';
import * as clientActions from '../../actions/clientActions';
import './client.css';

const sha1 = require('sha1');

const generateKey = opcode => {
    const pub = 'dsSUDfiwzrsfdgiASUFsdf';
    return sha1(pub + opcode);
};

const mapStateToProps = state => {
    const reg = new RegExp(state.client.searchText, 'gi');
    return {
        auth: state.user.auth,
        users: state.user.users,
        clients: (state.client.searchText !== '' && state.client.searchText) ? state.client.clients.rows.map(record => {
            const match = record.identifier.match(reg);
            if (!match) {
                return {};
            }
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
        }) : state.client.clients.rows,
    };
};


const mapDispatchToProps = dispatch => ({
    userActions: bindActionCreators(userActions, dispatch),
    actions: bindActionCreators(clientActions, dispatch),
});
const stringOrder = (a, b) => {
    {
        const nameA = a.username.toUpperCase();
        const nameB = b.username.toUpperCase();
        if (nameA < nameB) {
            return -1;
        } else if (nameA > nameB) {
            return 1;
        }
        return 0;
    }
};

class Clients extends React.Component {


    static defaultProps = {
        searchFilter: null,
        clients: [],
    };

    constructor(props, context) {
        super(props, context);

        this.state = {
            elevateUrl: null,
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

            paginationText: 'Show All',
            editedRecord: {},
            pagination: {},
            footer: null,
            loading: false,
            filterDropdownVisible: false,
            searchText: '',
            filtered: false,
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
        };
    }
    componentDidMount() {
        const {actions, userActions, auth} = this.props;
        userActions.checkAuth(auth);
        actions.getClients();
        userActions.getUsers();
    }
    onSearch = () => {
        const {actions} = this.props;
        actions.searchFilter(this.state.searchText);
    };
    onInputChange = e => {
        if (e) {
            this.setState({searchText: e.target.value});
        }
    };
    sendCreateForm = form => {
        const {actions} = this.props;
        const {visible, clientForm, formLoading} = this.state;
        actions.createClient(clientForm).then(
            () => {
                visible.create = false;
                formLoading.create = false;
                this.setState({visible, formLoading});
                form.resetFields();
            },
            err => {
                console.log(err);
            }
        );
    };
    handleCreateCancel = () => {
        const {visible, formLoading} = this.state;
        visible.create = false;
        formLoading.create = false;
        this.setState({visible, formLoading});
    };
    saveFormRef = form => {
        this.form = form;
    };
    handleCreate = () => {
        const {formLoading, clientForm} = this.state;
        formLoading.create = true;
        this.setState({formLoading});
        this.form.validateFields((err, values) => {
            if (err) {
                formLoading.create = false;
                this.setState({formLoading});
            } else {
                clientForm.identifier = values.identifier;
                clientForm.name = values.name;
                this.setState({clientForm}, this.sendCreateForm(this.form));
            }
        });
    };
    handleSelectLanguageChange = value => {
        const clientForm = this.state.clientForm;
        clientForm.lang = value;
        this.setState({clientForm, confirmLoading: false});
    };
    handleSelectTypeChange = value => {
        const {clientForm} = this.state;
        clientForm.type = value;
        this.setState({clientForm, confirmLoading: false});
    };


    handleUpateUserChange = value => {
        const {editedRecord} = this.state;
        editedRecord.ClientMetum.user_id = value;
        this.setState({editedRecord});
    }

    handleSelectUpdateLanguageChange = value => {
        const {editedRecord} = this.state;
        editedRecord.lang = value;
        this.setState({editedRecord});
    };
    handleSelectUpdateTypeChange = value => {
        const {editedRecord} = this.state;
        editedRecord.type = value;
        this.setState({editedRecord});
    };
    handleUdateExpire = value => {

        const {editedRecord} = this.state;
        editedRecord.expireDate = value;
        this.setState({editedRecord});

    }


    handleElevateCreate = () => {
        const {elevatorForm, formLoading} = this.state;
        formLoading.create = true;
        this.setState({formLoading});

        this.formElevator.validateFields((err, values) => {
            if (err) {
                formLoading.elevate = false;
                this.setState({formLoading});
            } else {
                elevatorForm.password = values.password;
                elevatorForm.username = this.props.auth.username;
                this.setState({elevatorForm}, this.sendElevatorForm);
                this.formElevator.resetFields();
            }
        });
    };


    edit(record) {
        this.setState({editedRecord: {...record}});
    }

    editDone(newRecord, record, type) {
        if (type === 'save') {
            if (newRecord !== record) {
                this.props.actions.updateClient(newRecord).then(
                    () => {
                        console.log('ok');
                    },
                    err => {
                        console.log(err);
                    }
                );
            }
        } else {
            this.setState({editedRecord: {}});
        }
    }


    remove = record => {
        const {actions} = this.props;
        actions.removeClient(record);
    };

    sendElevatorForm() {
        const {actions} = this.props;
        const {elevatorForm, formLoading} = this.state;
        actions.checkElevateClient(elevatorForm).then(
            res => {
                const elevateUrl = {
                    key: res.payload.res.key,
                    identifier: elevatorForm.identifier,
                };
                formLoading.elevate = false;
                this.setState({elevateUrl, formLoading});
            },
            err => {
                console.log(err);
            }
        );
    }

    showElevateModal = record => {
        const {elevatorForm, visible} = this.state;
        elevatorForm.identifier = record.identifier;
        visible.elevate = true;
        this.setState({visible, elevatorForm});
    };


    showUpdateModal = record => {
        const {visible} = this.state;
        visible.update = true;
        this.setState({visible, editedRecord: {...record}});
    }


    handleElevateCancel = () => {
        const {visible} = this.state;
        visible.elevate = false;
        this.setState({visible});
    };
    saveFormRefElevator = form => {
        this.formElevator = form;
    };

    saveFormRefUpdate = form => {
        this.formUpdate = form;
    };

    showCreateModal = () => {
        const {visible} = this.state;
        visible.create = true;
        this.setState({visible});
    };

    showAll = () => {
        if (!(this.state.pagination)) {
            this.setState({pagination: {}, paginationText: 'Show All'});
        } else {
            this.setState({pagination: false, paginationText: 'Paginate Table'});
        }
    };

    openChannelSettings = (identifier, type) => {
        const key = generateKey(identifier);
        let url;
        if (type === 'ikentoo') {
            url = `https://app.base7booking.com/ikentoo/admin/panel?key=${key}&opcode=${identifier}`;
        } else if (type === 'channel') {
            url = `https://app.base7booking.com/channel/admin/panel?key=${key}&opcode=${identifier}`;
        }
        console.log(url);
        return window.open(url);
    };
    updateRecord = (record, key) => {
        const newRecord = {...record};
        const newKey = key.split('#');
        if (newKey.length === 1) {
            newRecord[newKey[0]] = record[key] !== true;
        } else if ((newKey.length === 2)) {
            newRecord[newKey[0]][newKey[1]] = record[key] !== true;
        } else {
            newRecord[newKey[0]][newKey[1]][newKey[2]] = record[key] !== true;
        }

        this.editDone(newRecord, record, 'save');
    };

    handleUpdateCancel = () => {
        const {formLoading, editedRecord, visible} = this.state;
        visible.update = false;
        formLoading.update = false;
        this.setState({visible, formLoading});
    };
    handleUpdateCreate = () => {
        const {formLoading, editedRecord, visible} = this.state;
        formLoading.update = true;
        this.setState({formLoading});

        this.formUpdate.validateFields((err, values) => {
            if (err) {
                formLoading.update = false;
                this.setState({formLoading});
            } else {
                editedRecord.name = values.name;
                formLoading.update = true;
                this.props.actions.updateClient(editedRecord).then(
                    () => {
                        visible.update = false;
                        formLoading.update = false;
                        this.setState({visible, formLoading});
                    },
                    err => {
                        console.log(err);
                    }
                );
            }
        });
    };
    renderColumns(data, index, key, text, type) {
        let extraButton = null;
        if (!data) {
            return text;
        } else if (Object.keys(data[index]).length === 0) {
            return text;
        }
        if (type === 'boolean') {
            let element = null;
            if (key === 'ClientMetum#newChannel') {
                extraButton = (<Button
                    type="primary"
                    icon="setting"
                    className="black"
                    onClick={() => this.openChannelSettings(data[index].identifier, 'channel')}
                />);
            }
            if (key === 'ClientMetum#ikentoo') {
                extraButton = (<Button
                    type="primary"
                    icon="setting"
                    className="black"
                    onClick={() => this.openChannelSettings(data[index].identifier, 'ikentoo')}
                />);
            }

            if (data[index][key] === true) {
                element = (

                    <Popconfirm
                        placement="top"
                        title="Do you want to deactivate it?"
                        onConfirm={() => this.updateRecord(data[index], key)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="primary" icon="check" className="active"/>
                    </Popconfirm>);
            } else {
                element = (<Popconfirm
                    placement="top"
                    title="Do you want to activate it?"
                    onConfirm={() => this.updateRecord(data[index], key)}
                    okText="Yes"
                    cancelText="No"
                ><Button type="primary" icon="close" className="inactive"/>
                </Popconfirm>);
            }
            return [element, extraButton];
        }
        return text;
    }
    render() {
        const {clients} = this.props;
        const {searchText, filterDropdownVisible} = this.state;
        const {
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
                            <Button type="primary" onClick={() => this.showElevateModal(record)}>Connect</Button>
                            <Popconfirm
                                placement="top"
                                title="Do you want to delete the client?"
                                onConfirm={() => this.remove(record)}
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
                filterIcon: <Icon type="filter" style={{color: filtered ? '#108ee9' : '#aaa'}}/>,
                filterDropdownVisible,
                onFilterDropdownVisibleChange: vis => {
                    this.setState({filterDropdownVisible: vis}, () => this.searchInput.focus());
                },
            },
            {
                title: 'Name',
                dataIndex: 'name',
                onFilter: (value, record) => record.role.indexOf(value) === 0,
                sorter: (a, b) => stringOrder(a, b),
                render: (text, record, index) => this.renderColumns(clients, index, 'name', text, 'text'),
            },
            {
                title: 'Lang',
                dataIndex: 'lang',
                key: 'lang',
                render: (text, record, index) => this.renderColumns(clients, index, 'lang', text, 'text'),

            },
            {
                title: 'Active',
                dataIndex: 'active',
                key: 'active',
                render: (text, record, index) => this.renderColumns(clients, index, 'active', text, 'boolean'),

            },
            {
                title: 'Manteinance',
                dataIndex: 'maintenance',
                key: 'maintenance',
                render: (text, record, index) => this.renderColumns(clients, index, 'maintenance', text, 'boolean'),
            },
            {
                title: 'AutoUpdate',
                dataIndex: 'autoUpdate',
                key: 'autoUpdate',
                render: (text, record, index) => this.renderColumns(clients, index, 'autoUpdate', text, 'boolean'),

            },
            {
                title: 'new_invoice',
                dataIndex: 'ClientMetum#newInvoice',
                key: 'ClientMetum#newInvoice',
                render: (text, record, index) => this.renderColumns(clients, index, 'ClientMetum#newInvoice', text, 'boolean'),

            },
            {
                title: 'channel_manager',
                dataIndex: 'ClientMetum#newChannel',
                key: 'ClientMetum#newChannel',
                render: (text, record, index) => this.renderColumns(clients, index, 'ClientMetum#newChannel', text, 'boolean'),

            },
            {
                title: 'ikentoo',
                dataIndex: 'ClientMetum#ikentoo',
                key: 'ClientMetum#ikentoo',
                render: (text, record, index) => this.renderColumns(clients, index, 'ClientMetum#ikentoo', text, 'boolean'),

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
                filters: [
                    {
                        text: 'Demo',
                        value: 'demo',
                    },
                    {
                        text: 'Client',
                        value: 'client',
                    },
                    {
                        text: 'Dev',
                        value: 'dev',
                    },
                    {
                        text: 'Edu',
                        value: 'edu',
                    },
                    {
                        text: 'Closed',
                        value: 'closed',
                    },

                ],

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
                    onUserUpdate={this.handleUpateUserChange}
                    users={this.props.users}
                    onLanguageUpdateChange={value => this.handleSelectUpdateLanguageChange(value)}
                    onTypeUpdateChange={value => this.handleSelectUpdateTypeChange(value)}
                    OnUdateExpire={value => this.handleUdateExpire(value)}
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

Clients.propTypes = {
    auth: PropTypes.object.isRequired,
    searchFilter: PropTypes.func,
    userActions: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    clients: PropTypes.array,
};
export default connect(mapStateToProps, mapDispatchToProps)(Clients);
