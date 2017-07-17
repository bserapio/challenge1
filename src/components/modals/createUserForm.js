import React from "react";
import {Form, Input, Modal, Select} from "antd";

const Option = Select.Option;

const FormItem = Form.Item;


class CreateForm extends React.Component {


    handleSelectChange = (value) =>  {

        this.props.onChange(value)
    }
    render() {

        const {visible, onCancel, onCreate, form, confirmLoading} = this.props;
        const {getFieldDecorator} = form;
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
                    <FormItem label="Username">
                        {getFieldDecorator('username', {
                            rules: [{required: true, message: 'Please input the title of collection!'}],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="Password" hasFeedback>
                        {getFieldDecorator('password', {
                            rules: [{required: true, message: 'Please input your password!'}],
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
                            <Option value="guest">Guest</Option>
                            <Option value="user">User</Option>
                            <Option value="finance">Finance</Option>
                            <Option value="manager">Manager</Option>
                            <Option value="sales">Sales</Option>
                            <Option value="account-manager">Account manager</Option>
                            <Option value="admin">Admin</Option>
                            <Option value="super">Super</Option>

                        </Select>

                    </div>

                </Form>
            </Modal>
        );
    }
}

const UserCreateForm = Form.create()(CreateForm);


export default UserCreateForm;