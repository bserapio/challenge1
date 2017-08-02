import React from 'react';
import { Form, Input, Modal, Select, Alert } from 'antd';
import PropTypes from 'prop-types';


const Option = Select.Option;

const FormItem = Form.Item;


class UserForm extends React.Component {

    state = {
        record: {},
    };

    handleSelectChange = value => {
        const { record } = this.state;
        const { changeUpdateRecord } = this.props;
        record.role = value;
        this.setState({ record });
        changeUpdateRecord(record);
    };
    render() {
        const { visible, onCancel, onCreate, form, confirmLoading, createError, config, record } = this.props;
        if (!visible) {
            return null;
        }
        const roles = config.roles;
        const { getFieldDecorator } = form;

        const rolesChildren = [];
        Object.keys(roles).forEach(element => {
            const value = roles[element];
            rolesChildren.push(<Option value={value} key={element}>{value}</Option>);
        });

        let errorMessage = null;
        if (createError) {
            const message = createError.data.errors[0].message;

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
                title="Update an Exising User"
                okText="Update"
                cancelText="Cancel"
                onCancel={onCancel}
                confirmLoading={confirmLoading}
                onOk={onCreate}
            >
                <Form layout="vertical">
                    {errorMessage}
                    <FormItem label="Username">
                        {getFieldDecorator('username', {
                            initialValue: record.username,
                            rules: [{ required: true, message: 'Please input the username' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="Password" hasFeedback>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your password!' },
                                { min: 6, message: 'Password must be 6 chars' }],
                        })(
                            <Input type="password" />
                        )}
                    </FormItem>

                    <FormItem label="Name">
                        {getFieldDecorator('name', {
                            initialValue: record.name,
                            rules: [{ required: true, message: 'Please input your name' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <div>
                        <Select defaultValue={record.role} style={{ width: 120 }} onChange={this.handleSelectChange}>
                            {rolesChildren}
                        </Select>

                    </div>

                </Form>
            </Modal>
        );
    }
}

const UserUpdateForm = Form.create()(UserForm);
UserForm.propTypes = {
    createError: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired,
    config: PropTypes.object.isRequired,
    visible: PropTypes.bool.isRequired,
    form: PropTypes.object.isRequired,
    confirmLoading: PropTypes.bool,
    record: PropTypes.object.isRequired,
    changeUpdateRecord: PropTypes.func.isRequired,

};

UserForm.defaultProps = {
    clients: [],
    auth: [],
    confirmLoading: null,

};

export default UserUpdateForm;
