import {Form, Icon, Input, Button, Checkbox, Alert} from 'antd';
import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as userActions from '../../actions/userActions';
import './home.css';

const FormItem = Form.Item;

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(userActions, dispatch),
});
const mapStateToProps = state => ({
    auth: state.user.auth,
    users: state.user.users,
    loginError: state.user.loginError,
});

class NormalLoginForm extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {credentials: {username: '', password: ''}};
    }

    handleSubmit = e => {
        e.preventDefault();
        const {form} = this.props;
        form.validateFields((err, values) => {
            if (!err) {
                this.setState({credentials: values}, this.sendForm);
            }
        });
    };

    sendForm() {
        const {actions} = this.props;
        actions.loginUser(this.state.credentials);
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const {actions, loginError} = this.props;
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
                    <a className="login-form-forgot" href="">Forgot password</a>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    Or <a href="">register now!</a>
                </FormItem>
            </Form>
        );
    }
}

const Home = Form.create()(NormalLoginForm);


export default connect(mapStateToProps, mapDispatchToProps)(Home);
