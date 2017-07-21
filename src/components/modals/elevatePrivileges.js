import React from 'react';
import {Form, Input, Modal} from 'antd';

const FormItem = Form.Item;


class CreateElevatorForm extends React.Component {
    render() {
        const {visible, onElevatorCancel, onElevatorCreate, form, confirmElevatorLoading, modalText} = this.props;
        if (!visible) {
            return null;
        }
        const getHtml = res => ({__html: res});
        const getModal = (modalText, getFieldDecorator) => {
            if (modalText) {
                let res = '';
                const elevatorUrl = {
                    app: `https://app.stage.base7booking.com/api/backdoor/penetrate?key=${modalText.key}&opcode=${modalText.identifier}`,
                    beta: `https://dev.base7.io/use-token?is_backdoor=1&token=${modalText.key}&opcode=${modalText.identifier}`,
                    stage_app: `https://app.stage.base7booking.com/api/backdoor/penetrate?key=${modalText.key}&opcode=${modalText.identifier}`,
                    stage_beta: `https://dev.stage.base7.io/use-token?is_backdoor=1&token=${modalText.key}&opcode=${modalText.identifier}`,

                };
                for (const prop in elevatorUrl) {
                    const url = elevatorUrl[prop];
                    res += `<div> <a href=${url}>${prop}</a></div>`;
                }
                return <div dangerouslySetInnerHTML={getHtml(res)}/>;
            }
            return (
                <Form layout="vertical">
                    <FormItem label="Password" hasFeedback>
                        {getFieldDecorator('password', {
                            rules: [{
                                required: true,
                                message: 'Please input your password!',
                            }],
                        })(<Input type="password"/>)}
                    </FormItem>
                </Form>
            );
        };


        const {getFieldDecorator} = form;
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

export default ElevatePrigilegesForm;
