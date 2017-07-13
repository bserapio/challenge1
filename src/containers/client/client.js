import {Table, Icon, Input, Popconfirm} from 'antd';

import React from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
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


class EditableCell extends React.Component {

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.props.onChange(value);
    }


    checked(value) {
        if (value) {
            return "checked";
        }
        return ""
    }

    render() {
        const {value, editable, type, name} = this.props;

        let returnObject;
        let returnValue = '';

        if (!editable) {
            try {
                returnValue = value.toString() || ' ';
            } catch (exception) {
                returnValue = ' '
            }
            returnObject = (<div className="editable-row-text">{returnValue}</div>);
        } else {

            switch (type) {


                case 'boolean':
                    let checkActive = this.checked(value);
                    returnObject = (
                        <div><input type="checkbox" onChange={e => this.handleInputChange(e)} checked={checkActive}/>
                        </div>)
                    break;

                default:
                    returnObject = (<div><Input value={value} onChange={e => this.handleInputChange(e)}/></div>)
            }

        }
        return (
            <div>
                {returnObject}
            </div>
        );
    }
}

class Clients extends React.Component {


    state = {
        editedRecord: {},
        pagination: {},
        loading: false,
        editIndex: -1,
    };

    constructor(props, context) {
        super(props, context);
        this.columns = [
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
            {
                title: 'operation',
                dataIndex: 'operation',
                render: (text, record, index) => {

                    return (
                        <div className="editable-row-operations">
                            {
                                this.state.editedRecord.id === record.id ?
                                    <span>
                                        <a onClick={() => this.editDone(record, 'save')}>Save</a>
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
                                    <span> <a onClick={() => this.edit(record)}>Edit</a> </span>
                            }
                        </div>
                    );
                },
            }


        ];

    }
    componentDidMount() {
        this.props.userActions.checkAuth(this.props.auth);
        this.props.actions.getClients();
    }

    renderColumns(data, index, key, text, type) {
        if (this.state.editable === -1) {
            return text;
        } else {
            return (<EditableCell type={type}
                                  editable={this.state.editedRecord.id === data[index].id}
                                  value={this.state.editedRecord.id === data[index].id ? this.state.editedRecord[key] : data[index][key]}
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
    render() {
        return (
            <Table columns={this.columns}
                   rowKey={record => record.id}
                   dataSource={this.props.clients.rows}
                   pagination={this.state.pagination}
                   loading={this.state.loading}
            />
        );

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Clients)