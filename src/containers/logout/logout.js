import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as appActions from '../../actions/appActions';


const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(appActions, dispatch),
});
const mapStateToProps = state => ({
    auth: state.app.auth,
    users: state.app.users,
    loginError: state.app.loginError,
});


class Logout extends React.Component {

    componentWillMount() {
        const {actions} = this.props;
        actions.logOutUser();
    }

    render() {
        return null;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
