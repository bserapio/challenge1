import {Table, Icon} from 'antd';
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


const columns = [
    {
        title: 'identifier',
        dataIndex: 'identifier',
        width: '20%',
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
    }
    ,
    {
        title: 'clientId',
        dataIndex: 'clientId',
        key: 'clientId',
        sorter: (a, b) => a.clientId - b.clientId,

    },
    {
        title: 'Name',
        dataIndex: 'name',
        width: '20%',
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
    },
    {
        title: 'Lang',
        dataIndex: 'lang',
        key: 'lang'

    },
    {
        title: 'Active',
        dataIndex: 'active',
        key: 'active',
        render: (text, record, index) => {
            console.log(record.active);
            if (record.active) {
                console.log("Entro en  true");
                return ( <Icon type="check" style={{fontSize: 16, color: '#08c'}}/>)
            } else {
                console.log("Entro en  false");
                return ( <Icon type="close" style={{fontSize: 16, color: '#08c'}}/>)
            }

        }

    },
    {
        title: 'Manteinance',
        dataIndex: 'mantenaince',
        width: '20%',
        render: (text, record, index) => {
            if (record.manteinance) {
                return ( <Icon type="check" style={{fontSize: 16, color: '#08c'}}/>)
            } else {
                return ( <Icon type="close" style={{fontSize: 16, color: '#08c'}}/>)
            }

        }
    },
    {
        title: 'AutoUpdate',
        dataIndex: 'autoupdate',
        key: 'autoupate',
        render: (text, record, index) => {
            if (record.autoupdate) {
                return ( <Icon type="check" style={{fontSize: 16, color: '#08c'}}/>)
            } else {
                return ( <Icon type="close" style={{fontSize: 16, color: '#08c'}}/>)
            }

        }

    },

    {
        title: 'expireDate',
        dataIndex: 'expireDate',

    },
    {
        title: 'archivedAt',
        dataIndex: 'archivedAt',

    }

];


class Clients extends React.Component {
    state = {
        data: [],
        pagination: {},
        loading: false,
    };

    componentDidMount() {
        this.props.userActions.checkAuth(this.props.auth);
        this.props.actions.getClients();
    }

    handleTableChange = (pagination, filters, sorter) => {

    };

    render() {
        return (
            <Table columns={columns}
                   rowKey={record => record.id}
                   dataSource={this.props.clients.rows}
                   pagination={this.state.pagination}
                   loading={this.state.loading}
                   onChange={this.handleTableChange}
            />
        );

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Clients)