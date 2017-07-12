import {Table, Input, Button, Icon} from 'antd';
import React from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as userActions from '../../actions/userActions';

const mapStateToProps = function (state) {
    return {
        auth: state.user.auth,
        users: state.user.users
    }
};

const mapDispatchToProps = function (dispatch) {
    return {
        actions: bindActionCreators(userActions, dispatch)
    };
};

const data = [];
class User extends React.Component {

    state = {
        filterDropdownVisible: false,
        data,
        searchText: '',
        filtered: false,
    };


    componentDidMount() {
        this.props.actions.checkAuth(this.props.auth);

    }


    onInputChange = (e) => {
        this.setState({searchText: e.target.value});
    }
    onSearch = () => {
        const {searchText} = this.state;
        const reg = new RegExp(searchText, 'gi');
        this.setState({
            filterDropdownVisible: false,
            filtered: !!searchText,
            data: data.map((record) => {
                const match = record.name.match(reg);
                if (!match) {
                    return null;
                }
                return {
                    ...record,
                    name: (
                        <span>
              {record.name.split(reg).map((text, i) => (
                  i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
              ))}
            </span>
                    ),
                };
            }).filter(record => !!record),
        });
    }

    render() {
        const columns = [{
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            filterDropdown: (
                <div className="custom-filter-dropdown">
                    <Input
                        ref={ele => this.searchInput = ele}
                        placeholder="Search name"
                        value={this.state.searchText}
                        onChange={this.onInputChange}
                        onPressEnter={this.onSearch}
                    />
                    <Button type="primary" onClick={this.onSearch}>Search</Button>
                </div>
            ),
            filterIcon: <Icon type="smile-o" style={{color: this.state.filtered ? '#108ee9' : '#aaa'}}/>,
            filterDropdownVisible: this.state.filterDropdownVisible,
            onFilterDropdownVisibleChange: (visible) => {
                this.setState({
                    filterDropdownVisible: visible,
                }, () => this.searchInput.focus());
            },
        }, {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        }, {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            filters: [{
                text: 'London',
                value: 'London',
            }, {
                text: 'New York',
                value: 'New York',
            }],
            onFilter: (value, record) => record.address.indexOf(value) === 0,
        }];
        return <Table columns={columns} dataSource={this.state.data}/>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)