import React from 'react';
import {Form, Input, Modal, Select} from 'antd';

const Option = Select.Option;
const langs = require('../../config/lang');
const FormItem = Form.Item;
const types = require('../../config/type');

class CreateForm extends React.Component {

    handleSelectLanguageChange = value => {
        this.props.onLanguageChange(value);
    }
    handleSelectTypeChange = value => {
        this.props.onTypeChange(value);
    }
    render() {
        const {visible, onCancel, onCreate, form, confirmLoading} = this.props;
        const {getFieldDecorator} = form;

        const langChildren = [];
        Object.keys(langs).forEach(element => {
            const value = langs[element];
            langChildren.push(<Option value={element}>{value}</Option>);
        });

        const typeChildren = [];
        Object.keys(types).forEach(element => {
            const value = types[element];
            typeChildren.push(<Option value={element}>{value}</Option>);
        });

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
                            rules: [{required: true, message: 'Please input the Opcode of collection!'},
                                {max: 13, message: 'Opcode must be less than 13 chars'}],
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


                    <FormItem label="Language" hasFeedback>
                        <Select defaultValue="en" onChange={this.handleSelectLanguageChange}>
                            {langChildren}
                        </Select>
                    </FormItem>

                    <FormItem label="Client Type" hasFeedback>
                        <Select defaultValue="demo" onChange={this.handleSelectTypeChange}>
                            {typeChildren}
                        </Select>
                    </FormItem>


                </Form>
            </Modal>


        );
    }
}

const ClientCreateForm = Form.create()(CreateForm);

export default ClientCreateForm;
