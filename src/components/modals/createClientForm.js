import React from "react";
import {Form, Input, Modal, Select} from "antd";

const Option = Select.Option;

const FormItem = Form.Item;


class CreateForm extends React.Component {

    constructor(props, context) {
        super(props, context);

    }

    handleSelectLanguageChange = (value) => {

        this.props.onLanguageChange(value)
    }


    handleSelectTypeChange = (value) => {
        this.props.onTypeChange(value)
    }

    render() {

        const {visible, onCancel, onCreate, form, confirmLoading} = this.props;
        const {getFieldDecorator} = form;
        return (
            <Modal
                visible={visible}
                title="Create a new Client"
                okText="Create"
                cancelText="Cancel"
                onCancel={onCancel}
                confirmLoading={confirmLoading}
                onOk={onCreate}
            >
                <Form layout="vertical">
                    <FormItem label="Opcode" hasFeedback>
                        {getFieldDecorator('identifier', {
                            rules: [{required: true, message: 'Please input the Opcode of collection!'}],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="Hotel Name" hasFeedback>
                        {getFieldDecorator('name', {
                            rules: [{required: true, message: 'Please input your Name!'}],
                        })(
                            <Input />
                        )}
                    </FormItem>

                    <div>
                        <FormItem label="Language" hasFeedback>
                            <Select defaultValue="en" onChange={this.handleSelectLanguageChange}>
                                <Option value="en">English</Option>
                                <Option value="fr">French</Option>
                                <Option value="de">Deutsch</Option>
                                <Option value="es">Español</Option>
                                <Option value="nl">Nederlands</Option>
                                <Option value="sv">Svenska</Option>
                                <Option value="pt">Portugues</Option>
                                <Option value="it">Italiano</Option>
                                <Option value="ru">Rusian</Option>
                                <Option value="zh">Chinese</Option>
                                <Option value="sl">Slovenski</Option>
                                <Option value="no">Norsk</Option>
                                <Option value="nb">Norsk</Option>
                                <Option value="ka">Georgian</Option>
                                <Option value="ar">Argelian</Option>
                                <Option value="ja">Japanese</Option>
                                <Option value="el">Greece</Option>
                                <Option value="tr">"Turkey</Option>

                            </Select>
                        </FormItem>

                    </div>

                    <div>
                        <FormItem label="Client Type" hasFeedback>
                            <Select defaultValue="demo" onChange={this.handleSelectTypeChange}>
                                <Option value="demo">Demo</Option>
                                <Option value="client">Client</Option>
                                <Option value="dev">Dev</Option>
                                <Option value="edu">Edu</Option>
                                <Option value="closed">Closed</Option>
                            </Select>
                        </FormItem>
                    </div>

                </Form>
            </Modal>


        );
    }
}

const ClientCreateForm = Form.create()(CreateForm);

export default ClientCreateForm;