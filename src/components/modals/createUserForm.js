import React from 'react';
import {Form, Input, Modal, Select, Alert} from 'antd';

const roles = require('../../config/role');
const Option = Select.Option;

const FormItem = Form.Item;


class CreateForm extends React.Component {

    handleSelectChange = value => {
        this.props.onChange(value);
    }
    render() {
        const {visible, onCancel, onCreate, form, confirmLoading, createError} = this.props;
        if (!visible) {
            return null;
        }

        const {getFieldDecorator} = form;

        const rolesChildren = [];
        Object.keys(roles).forEach(element => {
            const value = roles[element];
            rolesChildren.push(<Option value={element}>{value}</Option>);
        });

        let errorMessage = null;
        if (createError) {
            console.log(createError);
            const message = createError.data.errors[0].message

            errorMessage = (<Alert
                message="Error"
                description={message}
                type="error"
                showIcon
            />);
        }


        return (
            <Modal
                visible={visible}
                title="Create a new User"
                okText="Create"
                cancelText="Cancel"
                onCancel={onCancel}
                confirmLoading={confirmLoading}
                onOk={onCreate}
            >
                <Form layout="vertical">
                    {errorMessage}
                    <FormItem label="Username">
                        {getFieldDecorator('username', {
                            rules: [{required: true, message: 'Please input the username'}],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="Password" hasFeedback>
                        {getFieldDecorator('password', {
                            rules: [{required: true, message: 'Please input your password!'},
                                {min: 6, message: 'Password must be 6 chars'}],
                        })(
                            <Input type="password"/>
                        )}
                    </FormItem>

                    <FormItem label="Name">
                        {getFieldDecorator('name', {
                            rules: [{required: true, message: 'Please input your name'}],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <div>
                        <Select defaultValue="super" style={{width: 120}} onChange={this.handleSelectChange}>
                            {rolesChildren}
                        </Select>

                    </div>

                </Form>
            </Modal>
        );
    }
}

const UserCreateForm = Form.create()(CreateForm);


export default UserCreateForm;
