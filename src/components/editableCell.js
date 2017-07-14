import {Table, Icon, Input, Popconfirm, Button} from 'antd';

import React from 'react';


class EditableCell extends React.Component {

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.props.onChange(value);
    }


    checked(value) {
        if (value) {
            return "checked";
        }
        return ""
    }

    render() {
        const {value, editable, type, name} = this.props;
        let returnObject;
        let returnValue = '';
        if (!editable) {
            try {
                returnValue = value.toString() || ' ';
            } catch (exception) {
                returnValue = ' '
            }
            returnObject = (<div className="editable-row-text">{returnValue}</div>);
        } else {

            switch (type) {
                case 'boolean':
                    let checkActive = this.checked(value);
                    returnObject = (
                        <div>
                            <input type="checkbox" onChange={e => this.handleInputChange(e)} checked={checkActive}/>
                        </div>)
                    break;

                default:
                    returnObject = (<div><Input value={value} onChange={e => this.handleInputChange(e)}/></div>)
            }

        }
        return (
            <div>
                {returnObject}
            </div>
        );
    }
}

export default EditableCell