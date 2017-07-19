
import React from 'react';
import {Form, Input, Modal, Select, DatePicker} from 'antd';

const moment = require('moment');
const Option = Select.Option;

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
            })
        }
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
                            <Option value="tr">Turkey</Option>

                        </Select>
                    </FormItem>


                    <FormItem label="Client Type" hasFeedback>
                        <Select value={record['ClientMetum#type']} onChange={this.handleSelectTypeChange}>
                            <Option value="demo">Demo</Option>
                            <Option value="client">Client</Option>
                            <Option value="dev">Dev</Option>
                            <Option value="edu">Edu</Option>
                            <Option value="closed">Closed</Option>
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
