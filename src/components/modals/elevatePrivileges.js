import React from 'react';
import {Form, Input, Modal} from 'antd';

const FormItem = Form.Item;


class CreateElevatorForm extends React.Component {


    render() {
        const getHtml = res => ({__html: res});
        const getModal = (modalText, getFieldDecorator) => {
            if (modalText) {
                let res = '';
                for (const prop in modalText) {
                    const url = modalText[prop];
                    res += `<div> <a href=${url}">${prop}</a></div>`;
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

        const {visible, onElevatorCancel, onElevatorCreate, form, confirmElevatorLoading, modalText} = this.props;
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
