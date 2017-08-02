import React from 'react';
import { Form, Input, Modal } from 'antd';
import PropTypes from 'prop-types';

const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config')[env];

const FormItem = Form.Item;


class CreateElevatorForm extends React.Component {
    render() {
        const { visible, onElevatorCancel, onElevatorCreate, form, confirmElevatorLoading, modalText } = this.props;
        if (!visible) {
            return null;
        }
        const getHtml = res => ({ __html: res });
        const getModal = (data, getFieldDecorator) => {
            if (data) {
                console.log(data);
                let res = '';
                const elevatorUrl = {
                    app: `${config.app + data.key}&opcode=${data.identifier}`,
                    beta: `${config.beta + data.key}&opcode=${data.identifier}`,
                    stage_app: `${config.stage_app + data.key}&opcode=${data.identifier}`,
                    stage_beta: `${config.stage_beta + data.key}&opcode=${data.identifier}`,

                };
                for (const prop in elevatorUrl) {
                    const url = elevatorUrl[prop];
                    res += `<div> <a href=${url}>${prop}</a></div>`;
                }
                return <div dangerouslySetInnerHTML={getHtml(res)} />;
            }
            return (
                <Form layout="vertical">
                    <FormItem label="Password" hasFeedback>
                        {getFieldDecorator('password', {
                            rules: [{
                                required: true,
                                message: 'Please input your password!',
                            }],
                        })(<Input type="password" />)}
                    </FormItem>
                </Form>
            );
        };


        const { getFieldDecorator } = form;
        return (
            <Modal
                visible={visible}
                title="Create a new Elevator"
                okText="Create"
                cancelText="Cancel"
                onCancel={onElevatorCancel}
                confirmLoading={confirmElevatorLoading}
                onOk={onElevatorCreate}
            >
                { getModal(modalText, getFieldDecorator)}


            </Modal>


        );
    }
}

const ElevatePrigilegesForm = Form.create()(CreateElevatorForm);
CreateElevatorForm.propTypes = {
    onElevatorCreate: PropTypes.func.isRequired,
    onElevatorCancel: PropTypes.func.isRequired,
    modalText: PropTypes.object,
    visible: PropTypes.bool.isRequired,
    form: PropTypes.object.isRequired,
    confirmElevatorLoading: PropTypes.bool.isRequired,
};


CreateElevatorForm.defaultProps = {
    clients: [],
    auth: [],
    modalText: null,

};

export default ElevatePrigilegesForm;
