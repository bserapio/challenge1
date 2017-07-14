import React from "react";
import {Form, Input, Modal, Select} from "antd";

const Option = Select.Option;

const FormItem = Form.Item;


class CreateElevatorForm extends React.Component {

    constructor(props, context) {
        super(props, context);

    }


    render() {

        const {visible, onElevatorCancel, onElevatorCreate, form, confirmElevatorLoading} = this.props;
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
                <Form layout="vertical">
                    <FormItem label="Password" hasFeedback>
                        {getFieldDecorator('password', {
                            rules: [{required: true, message: 'Please input your password!'}],
                        })(
                            <Input type="password"/>
                        )}
                    </FormItem>


                </Form>
            </Modal>


        );
    }
}

const ElevatePrigilegesForm = Form.create()(CreateElevatorForm);

export default ElevatePrigilegesForm;