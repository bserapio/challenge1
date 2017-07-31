
import React from 'react';
import { Form, Input, Modal, Select, DatePicker } from 'antd';
import PropTypes from 'prop-types';

const moment = require('moment');

const Option = Select.Option;


const FormItem = Form.Item;


class CreateForm extends React.Component {


    constructor(props, context) {
        super(props, context);
        this.state = {
            record: {},
            users: [],
        };
    }

    componentDidMount() {


    }
    componentWillReceiveProps(nextProps) {
        const {users, record} = nextProps;
        this.setState({record, users});
    }


    handleSelectLanguageChange = value => {
        const { record } = this.state;
        const {changeUpdateRecord} = this.props;
        record.lang = value;
        this.setState({ record });
        changeUpdateRecord(record);
    };

    handleSelectTypeChange = value => {
        const {changeUpdateRecord} = this.props;
        const { record } = this.state;
        record.ClientMetum.type = value;
        this.setState({ record });
        changeUpdateRecord(record);
    };

    handleSelectUserChange = value => {
        const { record } = this.state;
        const {changeUpdateRecord} = this.props;
        record.ClientMetum.user_id = value;
        this.setState({ record });
        changeUpdateRecord(record);
    };


    handleUpdateExpire = value => {
        const { record } = this.state;
        const {changeUpdateRecord} = this.props;
        record.expireDate = value.format('YYYY-MM-DD');
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

        const {record} = this.state;
        if (!visible) {
            return null;
        }
        const langs = config.lang;
        const types = config.types;

        const { getFieldDecorator } = form;
        const children = [];

        if (users.rows) {
            Object.keys(users.rows).forEach(element => {
                const ele = users.rows[element];
                const id = String(ele.id);
                children.push(<Option value={id} key={id}>{ele.username}</Option>);
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
                        <Select defaultValue={record['ClientMetum#type']} onChange={this.handleSelectTypeChange}>
                            {typeChildren}
                        </Select>
                    </FormItem>

                    <FormItem label="Owner" hasFeedback>
                        <Select defaultValue={String(record['ClientMetum#user_id'])} onChange={this.handleSelectUserChange}>
                            {children}
                        </Select>
                    </FormItem>

                </Form>
            </Modal>


        );
    }
}

const UpdateClientForm = Form.create()(CreateForm);
CreateForm.propTypes = {

    onUpdateCancel: PropTypes.func.isRequired,
    onUpdateCreate: PropTypes.func.isRequired,
    config: PropTypes.object.isRequired,
    visible: PropTypes.bool.isRequired,
    form: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired,
    record: PropTypes.object.isRequired,
    changeUpdateRecord: PropTypes.object.isRequired,
    confirmLoading: PropTypes.bool.isRequired,
};


CreateForm.defaultProps = {
    clients: [],
    users: [],
    auth: [],

};

export default UpdateClientForm;
