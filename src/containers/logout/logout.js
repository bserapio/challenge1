import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as userActions from '../../actions/userActions';


const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(userActions, dispatch),
});
const mapStateToProps = state => ({
    auth: state.user.auth,
    users: state.user.users,
    loginError: state.user.loginError,
});


class Logout extends React.Component {

    componentWillMount() {
        this.props.actions.logOutUser();
    }

    render() {
        return null;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
