import { Form, Icon, Input, Button, Checkbox, Alert } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { bindActionCreators } from 'redux';
import {} from 'react-router-redux';
import { connect } from 'react-redux';
import * as authAc from '../../ducks/modules/auth';
import './home.css';

const FormItem = Form.Item;

const mapDispatchToProps = dispatch => ({
    authActions: bindActionCreators(authAc, dispatch),
});
const mapStateToProps = state => ({
    auth: state.auth.auth,
    users: state.user.users,
    loginError: state.auth.loginError,
    router: state.router,
});

class NormalLoginForm extends React.Component {

    state = {
        credentials: {
            username: '',
            password: '',
        },
    };
    handleSubmit = e => {
        e.preventDefault();
        const { form } = this.props;
        form.validateFields((err, values) => {
            if (!err) {
                this.setState({ credentials: values }, this.sendForm);
            }
        });
    };

    sendForm() {
        const { authActions, history } = this.props;
        const { credentials } = this.state;
        authActions.loginUserAction(credentials).then(
            data => {
                if (data.payload.data) {
                    history.push('/clients');
                }
            }
        );
    }

    render() {
        const { loginError, form } = this.props;
        const { getFieldDecorator } = form;
        let errorMessage = '';

        if (loginError) {
            errorMessage = (<Alert
                message="Error"
                description="Error login user"
                type="error"
                showIcon
            />);
        }
        return (


            <Form onSubmit={this.handleSubmit} className="login-form">
                {errorMessage}
                <FormItem>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
                    )}
                </FormItem>
                <FormItem >
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>Remember me</Checkbox>
                    )}
                    <Button type="primary" htmlType="submit" className="login-form-button">Log in</Button>

                </FormItem>
            </Form>
        );
    }
}

const Home = Form.create()(NormalLoginForm);
NormalLoginForm.propTypes = {
    authActions: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    loginError: PropTypes.object,
    form: PropTypes.object,
};

NormalLoginForm.defaultProps = {
    loginError: null,
    form: null,
    auth: [],
    createError: null,

};


export default connect(mapStateToProps, mapDispatchToProps)(Home);
