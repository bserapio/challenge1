
import React from 'react';
import PropTypes from 'prop-types';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Table, Icon, Input, Popconfirm, Button} from 'antd';
import ClientCreateForm from '../../components/modals/createClientForm';
import UpdateClientForm from '../../components/modals/updateClientForm';
import EditableCell from '../../components/editableCell';
import ElevatePrigilegesForm from '../../components/modals/elevatePrivileges';
import * as userActions from '../../actions/userActions';
import * as clientActions from '../../actions/clientActions';
import './client.css';

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
            visible: {
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

            confirmLoading: false,
            confirmElevateLoading: false,
            elevateUrl: null,
            clientRequest: {},

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
        this.props.userActions.checkAuth(this.props.auth);
        this.props.actions.getClients();
    }

    onSearch = () => {
        this.props.actions.searchFilter(this.state.searchText);
    };
    onInputChange = e => {
        if (e) {
            this.setState({searchText: e.target.value});
        }
    };

    sendForm = form => {
        this.props.actions.createClient(this.state.clientForm).then(
            () => {
                const visible = this.state.visible;
                visible.create = false;
                this.setState({visible, confirmLoading: false});
                form.resetFields();
            },
            err => {
                console.log(err);
            }
        );
    };
    handleCancel = () => {
        const visible = this.state.visible;
        visible.create = false;
        this.setState({visible, confirmLoading: false});
    };
    saveFormRef = form => {
        this.form = form;
    };
    handleCreate = () => {
        const form = this.form;
        this.setState({confirmLoading: true});
        form.validateFields((err, values) => {
            if (err) {
                console.log(err);
                this.setState({confirmLoading: false});
            } else {
                const clientForm = this.state.clientForm;
                clientForm.identifier = values.identifier;
                clientForm.name = values.name;
                this.setState({clientForm}, this.sendForm(form));

            }
        });
    };
    handleSelectLanguageChange = value => {
        const clientForm = this.state.clientForm;
        clientForm.lang = value;
        this.setState({clientForm, confirmLoading: false});
    };
    handleSelectTypeChange = value => {
        const clientForm = this.state.clientForm;
        clientForm.type = value;
        this.setState({clientForm, confirmLoading: false});
    };
    handleModalCreate = () => {
        const form = this.formElevator;
        this.setState({confirmModalLoading: true});

        form.validateFields((err, values) => {
            if (err) {
                this.setState({confirmLoading: false});
            } else {
                const elevatorForm = this.state.elevatorForm;
                elevatorForm.password = values.password;
                elevatorForm.username = this.props.auth.username;

                this.setState({elevatorForm}, this.sendElevatorForm);
                form.resetFields();
                this.setState({visible: false});
            }
        });
    };


    /*
     Edit Client
     */

    handleChange(key, value) {
        const editedRecord = this.state.editedRecord;
        editedRecord[key] = value;
        this.setState({editedRecord});
    }

    edit(record) {
        this.setState({editedRecord: {...record}});
    }

    editDone(record, type) {
        if (type === 'save') {
            // Save the record
            console.log(this.state.editedRecord);

            if (record !== this.state.editedRecord) {
                this.props.actions.updateClient(this.state.editedRecord).then(
                    () => {
                        this.setState({editedRecord: {}});
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
        this.props.actions.removeClient(record);
    };


    sendElevatorForm() {
        this.props.actions.checkElevateClient(this.state.elevatorForm).then(
            res => {
                // Need to fix that
                const key = res.payload.res.key;
                const elevatorUrl = {
                    app: `https://app.stage.base7booking.com/api/backdoor/penetrate?key=${key}&opcode=${this.state.elevatorForm.identifier}`,
                    beta: `https://dev.base7.io/use-token?is_backdoor=1&token=${key}&opcode=${this.state.elevatorForm.identifier}`,
                    stage_app: `https://app.stage.base7booking.com/api/backdoor/penetrate?key=${key}&opcode=${this.state.elevatorForm.identifier}`,
                    stage_beta: `https://dev.stage.base7.io/use-token?is_backdoor=1&token=${key}&opcode=${this.state.elevatorForm.identifier}`,

                };
                this.setState({confirmLoading: false});

                this.setState({elevateUrl: elevatorUrl});
            },
            err => {
                console.log(err);
            }
        );
    }

    showElevateModal = record => {
        const elevatorForm = this.state.elevatorForm;
        elevatorForm.identifier = record.identifier;
        const visible = this.state.visible;
        visible.elevate = true;
        this.setState({visible});
    };
    handleElevateCancel = () => {
        this.setState({visibleElevate: false});
    };
    saveFormRefElevator = form => {
        this.formElevator = form;
    };


    showModal = () => {
        const visible = this.state.visible;
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

    renderColumns(data, index, key, text, type) {
        if (!data) {
            return text;
        } else if (Object.keys(data[index]).length === 0) {
            return text;
        }

        const value = this.state.editedRecord.id === data[index].id ? this.state.editedRecord[key] : data[index][key];
        return (<EditableCell
            type={type}
            editable={this.state.editedRecord.id === data[index].id}
            value={value}
            name={key}
            onChange={() => this.handleChange(key, value)}
        />);
    }
    render() {
        const columns = [
            {
                title: 'operation',
                dataIndex: 'operation',
                onFilter: (value, record) => record.role.indexOf(value) === 0,
                render: (text, record, index) => {
                    if (Object.keys(record).length === 0) {
                        return null;
                    }

                    return (
                        <div className="editable-row-operations">
                            {
                                this.state.editedRecord.id === record.id ?
                                    <span>
                                        <a onClick={() => this.editDone(record, 'save')}>Save</a>|
                                        <Popconfirm
                                            title="Sure to cancel?"
                                            okText="Yes"
                                            cancelText="No"
                                            onConfirm={
                                                () => this.editDone(index, 'cancel')}
                                        >
                                            <a>Cancel</a>
                                        </Popconfirm>
                                    </span>
                                    :
                                    <span> <a onClick={() => this.edit(record)}>Edit</a>| <Button
                                        type="primary"
                                        onClick={() => this.showElevateModal(record)}
                                    >Elevate</Button>  |
                                      <Popconfirm
                                          title="Sure to Delete?"
                                          okText="Yes"
                                          cancelText="No"
                                          onConfirm={() => this.remove(record, 'cancel')}
                                      >
                                          <a>Delete</a>
                                      </Popconfirm>
                                    </span>
                            }
                        </div>
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
                            value={this.state.searchText}
                            onChange={this.onInputChange}
                            onPressEnter={this.onSearch}
                        />
                        <Button type="primary" onClick={this.onSearch}>Search</Button>
                    </div>
                ),
                filterIcon: <Icon type="filter" style={{color: this.state.filtered ? '#108ee9' : '#aaa'}}/>,
                filterDropdownVisible: this.state.filterDropdownVisible,
                onFilterDropdownVisibleChange: visible => {
                    this.setState({
                        filterDropdownVisible: visible,
                    }, () => this.searchInput.focus());
                },
            },

            {
                title: 'Name',
                dataIndex: 'name',
                onFilter: (value, record) => record.role.indexOf(value) === 0,
                sorter: (a, b) => stringOrder(a, b),
                render: (text, record, index) => this.renderColumns(this.props.clients, index, 'name', text, 'text'),
            },
            {
                title: 'Lang',
                dataIndex: 'lang',
                key: 'lang',
                render: (text, record, index) => this.renderColumns(this.props.clients, index, 'lang', text, 'text'),

            },
            {
                title: 'Type',
                dataIndex: 'ClientMetum#type',
                onFilter: (value, record) => record['ClientMetum#type'].indexOf(value) === 0,
                render: (text, record, index) => this.renderColumns(this.props.clients, index, 'ClientMetum#type', text, 'text'),
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
                title: 'Active',
                dataIndex: 'active',
                key: 'active',
                render: (text, record, index) => this.renderColumns(this.props.clients, index, 'active', text, 'boolean'),

            },
            {
                title: 'Manteinance',
                dataIndex: 'maintenance',
                key: 'maintenance',
                render: (text, record, index) => this.renderColumns(this.props.clients, index, 'maintenance', text, 'boolean'),
            },
            {
                title: 'AutoUpdate',
                dataIndex: 'autoUpdate',
                key: 'autoUpdate',
                render: (text, record, index) => this.renderColumns(this.props.clients, index, 'autoUpdate', text, 'boolean'),

            },
            {
                title: 'expireDate',
                dataIndex: 'expireDate',
                render: (text, record, index) => this.renderColumns(this.props.clients, index, 'expireDate', text, 'datetime'),
            },
            {
                title: 'archivedAt',
                dataIndex: 'archivedAt',
                render: (text, record, index) => this.renderColumns(this.props.clients, index, 'archivedAt', text, 'datetime'),

            },


        ];
        return (
            <div>

                <Button.Group size="default">
                    <Button type="primary" onClick={this.showModal}>Create an Client</Button>
                    <Button type="primary" onClick={this.showAll}>{this.state.paginationText}</Button>
                </Button.Group>


                <ClientCreateForm
                    ref={this.saveFormRef}
                    visible={this.state.visible.create}
                    onCancel={this.handleCancel}
                    confirmLoading={this.state.confirmLoading}
                    onCreate={this.handleCreate}
                    onLanguageChange={value => this.handleSelectLanguageChange(value)}
                    onTypeChange={value => this.handleSelectTypeChange(value)}
                />


                <ElevatePrigilegesForm
                    ref={this.saveFormRefElevator}
                    visible={this.state.visible.elevate}
                    onElevatorCancel={this.handleElevateCancel}
                    confirmElevatorLoading={this.state.confirmElevateLoading}
                    onElevatorCreate={this.handleModalCreate}
                    modalText={this.state.elevateUrl}
                />


                <UpdateClientForm
                    ref={this.saveFormRefElevator}
                    visible={this.state.visible.update}
                    onElevatorCancel={this.handleElevateCancel}
                    confirmElevatorLoading={this.state.confirmElevateLoading}
                    onElevatorCreate={this.handleModalCreate}
                    modalText={this.state.elevateUrl}
                    row={this.state.editedRecord}
                />


                <Table
                    columns={columns}
                    rowKey={record => record.id}
                    dataSource={this.props.clients}
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
