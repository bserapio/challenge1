
import React from 'react';
import {Form, Input, Modal, Select, DatePicker} from 'antd';

const moment = require('moment');
const Option = Select.Option;
const langs = require('../../config/lang');
const types = require('../../config/type');
const FormItem = Form.Item;


class CreateForm extends React.Component {

    handleSelectLanguageChange = value => {
        this.props.onLanguageUpdateChange(value);
    };


    handleSelectTypeChange = value => {
        this.props.onTypeUpdateChange(value);
    };

    handleSelectUserChange = value => {
        this.props.onUserUpdate(value);
    };
    handleUpdateExpire = value => {
        this.props.OnUdateExpire(value.format('YYYY-MM-DD'));
    }

    render() {
        const {visible, onUpdateCancel, onUpdateCreate, form, confirmLoading, record, users} = this.props;
        const {getFieldDecorator} = form;
        const children = [];
        if (users.rows) {
            Object.keys(users.rows).forEach(element => {
                const ele = users.rows[element];
                children.push(<Option value={ele.id}>{ele.username}</Option>);
            });
        }
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
                title="Udate Client"
                okText="Update"
                cancelText="Cancel"
                onCancel={onUpdateCancel}
                confirmLoading={confirmLoading}
                onOk={onUpdateCreate}

            >
                <Form layout="vertical">
                    <FormItem label="Hotel Name" hasFeedback>
                        {getFieldDecorator('name', {
                            initialValue: record.name,
                            rules: [{required: true, message: 'Please input your Name!'}],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="ExpireDate" hasFeedback>
                        <DatePicker
                            format="YYYY-MM-DD"
                            placeholder="Select Time"
                            onChange={this.handleUpdateExpire}
                            onOk={this.handleUpdateExpire}
                            defaultValue={moment(record.expireDate)}
                        />
                    </FormItem>
                    <FormItem label="Language" hasFeedback>
                        <Select defaultValue={record.lang} onChange={this.handleSelectLanguageChange}>
                            {langChildren}

                        </Select>
                    </FormItem>


                    <FormItem label="Client Type" hasFeedback>
                        <Select value={record['ClientMetum#type']} onChange={this.handleSelectTypeChange}>
                            {typeChildren}
                        </Select>
                    </FormItem>

                    <FormItem label="Owner" hasFeedback>
                        <Select defaultValue={record['ClientMetum#user_id']} onChange={this.handleSelectUserChange}>
                            {children}
                        </Select>
                    </FormItem>

                </Form>
            </Modal>


        );
    }
}

const UpdateClientForm = Form.create()(CreateForm);

export default UpdateClientForm;
