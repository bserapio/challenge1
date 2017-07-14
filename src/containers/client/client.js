import {Table, Icon, Input, Popconfirm, Button} from 'antd';

import React from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import ClientCreateForm from "../../components/modals/createClientForm";
import EditableCell from "../../components/editableCell";
import ElevatePrigilegesForm from "../../components/modals/elevatePrivileges";

import * as userActions from '../../actions/userActions';
import * as clientActions from '../../actions/clientActions';

const mapStateToProps = function (state) {
    return {
        auth: state.user.auth,
        users: state.user.users,
        clients: state.client.clients,
    }
};

const mapDispatchToProps = function (dispatch) {
    return {
        userActions: bindActionCreators(userActions, dispatch),
        actions: bindActionCreators(clientActions, dispatch)
    };
};

class Clients extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.columns = [
            {
                title: 'operation',
                dataIndex: 'operation',
                render: (text, record, index) => {

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
                                    <span> <a onClick={() => this.edit(record)}>Edit</a>| <Button type="primary"
                                                                                                  onClick={() => this.showElevateModal(record)}>Create an Client</Button></span>
                            }
                        </div>
                    );
                },
            },
            {
                title: 'identifier',
                dataIndex: 'identifier',
                onFilter: (value, record) => record.username.indexOf(value) === 0,
                sorter: (a, b) => {
                    var nameA = a.identifier.toUpperCase(); // ignore upper and lowercase
                    var nameB = b.identifier.toUpperCase(); // ignore upper and lowercase
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }

                    // names must be equal
                    return 0;

                },
                render: (text, record, index) => this.renderColumns(this.props.clients.rows, index, 'identifier', text),
            },
            {
                title: 'Name',
                dataIndex: 'name',
                onFilter: (value, record) => record.role.indexOf(value) === 0,
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
                render: (text, record, index) => this.renderColumns(this.props.clients.rows, index, 'name', text, 'text'),
            },
            {
                title: 'Lang',
                dataIndex: 'lang',
                key: 'lang',
                render: (text, record, index) => this.renderColumns(this.props.clients.rows, index, 'lang', text, 'text'),

            },
            {
                title: 'Type',
                dataIndex: 'ClientMetum#type',
                onFilter: (value, record) => record['ClientMetum#type'].indexOf(value) === 0,
                render: (text, record, index) => this.renderColumns(this.props.clients.rows, index, 'ClientMetum#type', text, 'text'),
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
                    }
                    , {
                        text: 'Closed',
                        value: 'closed',
                    }

                ]

            },
            {
                title: 'Active',
                dataIndex: 'active',
                key: 'active',
                render: (text, record, index) => this.renderColumns(this.props.clients.rows, index, 'active', text, 'boolean'),

            },
            {
                title: 'Manteinance',
                dataIndex: 'maintenance',
                key: 'maintenance',
                render: (text, record, index) => this.renderColumns(this.props.clients.rows, index, 'maintenance', text, 'boolean'),
            },
            {
                title: 'AutoUpdate',
                dataIndex: 'autoUpdate',
                key: 'autoUpdate',
                render: (text, record, index) => this.renderColumns(this.props.clients.rows, index, 'autoUpdate', text, 'boolean'),

            },
            {
                title: 'expireDate',
                dataIndex: 'expireDate',

            },
            {
                title: 'archivedAt',
                dataIndex: 'archivedAt',

            },



        ];
        this.state = {
            editedRecord: {},
            pagination: {},
            loading: false,
            visible: false,
            visibleElevate: false,
            confirmLoading: false,
            confirmElevateLoading: false,
            clientRequest: {},
            editIndex: -1,

            locale: {
                filterConfirm: 'Ok',
                filterReset: 'Reset',
                emptyText: 'No Data'
            },
            elevatorForm: {
                password: '',
                username: '',
                identifier: ''
            },
            clientForm: {
                identifier: '',
                name: '',
                lang: 'en',
                type: 'demo'
            }
        };


    }
    componentDidMount() {
        this.props.userActions.checkAuth(this.props.auth);
        this.props.actions.getClients();
    }
    renderColumns(data, index, key, text, type) {
        if (this.state.editable === -1) {
            return text;
        } else {
            let value;
            value = this.state.editedRecord.id === data[index].id ? this.state.editedRecord[key] : data[index][key];

            return (<EditableCell type={type}
                                  editable={this.state.editedRecord.id === data[index].id}
                                  value={value}
                                  name={key}
                                  onChange={value => this.handleChange(key, value)}
            />);
        }

    }
    handleChange(key, value) {
        const editedRecord = this.state.editedRecord;
        editedRecord[key] = value;

        this.setState({editedRecord: editedRecord});
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
                        this.setState({editedRecord: {}})
                    },
                    (err) => {

                    }
                );
            }

        } else {
            this.setState({editedRecord: {}})
        }

    }

    showModal = () => {
        this.setState({visible: true});
    };
    handleCancel = () => {
        this.setState({visible: false});
    };

    saveFormRef = (form) => {
        this.form = form;
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
                let clientForm = this.state.clientForm;
                clientForm.identifier = values.identifier;
                clientForm.name = values.name;

                this.setState({clientForm: clientForm}, this.sendForm);
                form.resetFields();
                this.setState({visible: false});
            }
        })

    };


    sendForm() {

        this.props.actions.createClient(this.state.clientForm).then(
            () => {
                this.setState({visible: false, confirmLoading: false});
            },
            (err) => {
            }
        )
    };


    handleSelectLanguageChange = (value) => {
        let clientForm = this.state.clientForm;
        clientForm.lang = value;
        this.setState({clientForm: clientForm});

    };
    handleSelectTypeChange = (value) => {
        let clientForm = this.state.clientForm;
        clientForm.type = value;
        this.setState({clientForm: clientForm});

    };


    handleModalCreate = () => {
        const form = this.formElevator;
        this.setState({
            ModalText: 'The modal will be closed after two seconds',
            confirmModalLoading: true,
        });

        form.validateFields((err, values) => {
            if (err) {
                return;
            } else {
                let elevatorForm = this.state.elevatorForm;
                elevatorForm.password = values.elevatorForm;
                elevatorForm.username = this.props.auth.username;

                this.setState({elevatorForm: elevatorForm}, this.sendElevatorForm);
                form.resetFields();
                this.setState({visible: false});
            }
        })
    }


    sendElevatorForm() {

        this.props.actions.checkElevateClient(this.state.elevatorForm).then(
            () => {
                this.setState({visible: false, confirmLoading: false});
            },
            (err) => {
            }
        )
    };


    showElevateModal = (record) => {
        let elevatorForm = this.state.elevatorForm;
        elevatorForm.identifier = record.identifier;
        this.setState({visibleElevate: true});
    }

    handleElevateCancel = () => {
        this.setState({visibleElevate: false});
    };

    saveFormRefElevator = (form) => {
        this.formElevator = form;
    };


    render() {
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>Create an Client</Button>
                <ClientCreateForm
                    ref={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    confirmLoading={this.state.confirmLoading}
                    onCreate={this.handleCreate}
                    onLanguageChange={value => this.handleSelectLanguageChange(value)}
                    onTypeChange={value => this.handleSelectTypeChange(value)}
                />


                <ElevatePrigilegesForm
                    ref={this.saveFormRefElevator}
                    visible={this.state.visibleElevate}
                    onElevatorCancel={this.handleElevateCancel}
                    confirmElevatorLoading={this.state.confirmElevateLoading}
                    onElevatorCreate={this.handleModalCreate}
                />


                <Table columns={this.columns}
                       rowKey={record => record.id}
                       dataSource={this.props.clients.rows}
                       pagination={this.state.pagination}
                       loading={this.state.loading}
                       locale={this.state.locale}
                />
            </div>
        );

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Clients)