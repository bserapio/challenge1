
import React from 'react';
import { Form, Input, Modal, Select, DatePicker } from 'antd';
import PropTypes from 'prop-types';

const moment = require('moment');

const Option = Select.Option;


const FormItem = Form.Item;


class UpdateForm extends React.Component {


    state = {
        record: {},
        users: {},
    };

    componentDidMount() {


    }
    componentWillReceiveProps(nextProps) {
        const { users, record } = nextProps;
        this.setState({ record, users });
    }


    handleSelectLanguageChange = value => {
        const { record } = this.state;
        const { changeUpdateRecord } = this.props;
        record.lang = value;
        this.setState({ record });
        changeUpdateRecord(record);
    };

    handleSelectTypeChange = value => {
        const { changeUpdateRecord } = this.props;
        const { record } = this.state;
        record.client_metas.type = value;
        this.setState({ record });
        changeUpdateRecord(record);
    };

    handleSelectUserChange = value => {
        const { record } = this.state;
        const { changeUpdateRecord } = this.props;
        record.client_metas.user_id = value;
        this.setState({ record });
        changeUpdateRecord(record);
    };


    handleUpdateExpire = value => {
        const { record } = this.state;
        const { changeUpdateRecord } = this.props;
        record.expire_date = value.format('YYYY-MM-DD');
        this.setState({ record });
        changeUpdateRecord(record);
    };


    render() {
        const {
            visible,
            onUpdateCancel,
            onUpdateCreate,
            form,
            confirmLoading,
            users,
            config,
        } = this.props;

        const { record } = this.state;
        if (!visible) {
            return null;
        }
        const langs = config.lang;
        const types = config.types;

        const { getFieldDecorator } = form;
        const children = [];

        if (users) {
            Object.keys(users).forEach(element => {

                const ele = users[element];
                children.push(<Option value={element} key={element}>{ele}</Option>);
            });
        }
        const langChildren = [];
        Object.keys(langs).forEach(element => {
            const value = langs[element];
            langChildren.push(<Option value={element} key={element}>{value}</Option>);
        });

        const typeChildren = [];
        Object.keys(types).forEach(element => {
            const value = types[element];
            typeChildren.push(<Option value={value} key={element}>{value}</Option>);
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
                            rules: [{ required: true, message: 'Please input your Name!' }],
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
                        <Select defaultValue={record['client_metas#type']} onChange={this.handleSelectTypeChange}>
                            {typeChildren}
                        </Select>
                    </FormItem>

                    <FormItem label="Owner" hasFeedback>
                        <Select defaultValue={String(users[record['client_metas#user_id']])} onChange={this.handleSelectUserChange}>
                            {children}
                        </Select>
                    </FormItem>

                </Form>
            </Modal>


        );
    }
}

const UpdateClientForm = Form.create()(UpdateForm);
UpdateForm.propTypes = {

    onUpdateCancel: PropTypes.func.isRequired,
    onUpdateCreate: PropTypes.func.isRequired,
    config: PropTypes.object.isRequired,
    visible: PropTypes.bool.isRequired,
    form: PropTypes.object.isRequired,
    users: PropTypes.array.isRequired,
    record: PropTypes.object.isRequired,
    changeUpdateRecord: PropTypes.func.isRequired,
    confirmLoading: PropTypes.bool,
};


UpdateForm.defaultProps = {
    clients: [],
    auth: [],
    users: [],
    confirmLoading: null,

};

export default UpdateClientForm;
