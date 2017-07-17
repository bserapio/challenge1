import React from 'react';
import PropTypes from 'prop-types';

import {Input, DatePicker} from 'antd';

const moment = require('moment');


class EditableCell extends React.Component {

    static checked(value) {
        if (value) {
            return 'checked';
        }
        return '';
    }

    constructor(props, context) {
        super(props, context);

        this.state = {
            locale: {
                calendar: {
                    'lang': {
                        'placeholder': 'Select date',
                        'rangePlaceholder': [
                            'Start date',
                            'End date',
                        ],
                        'today': 'Today',
                        'now': 'Now',
                        'backToToday': 'Back to today',
                        'ok': 'Ok',
                        'clear': 'Clear',
                        'month': 'Month',
                        'year': 'Year',
                        'timeSelect': 'Select time',
                        'dateSelect': 'Select date',
                        'monthSelect': 'Choose a month',
                        'yearSelect': 'Choose a year',
                        'decadeSelect': 'Choose a decade',
                        'yearFormat': 'YYYY',
                        'dateFormat': 'M/D/YYYY',
                        'dayFormat': 'D',
                        'dateTimeFormat': 'M/D/YYYY HH:mm:ss',
                        'monthFormat': 'MMMM',
                        'monthBeforeYear': true,
                        'previousMonth': 'Previous month (PageUp)',
                        'nextMonth': 'Next month (PageDown)',
                        'previousYear': 'Last year (Control + left)',
                        'nextYear': 'Next year (Control + right)',
                        'previousDecade': 'Last decade',
                        'nextDecade': 'Next decade',
                        'previousCentury': 'Last century',
                        'nextCentury': 'Next century',
                    },
                    'timePickerLocale': {
                        'placeholder': 'Select time',
                    },
                },
            },
        };
    }


    onChangeDate(value, dateString) {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
    }

    onOkDate(value) {
        console.log('onOk: ', value);
    }


    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.props.onChange(value);
    }


    render() {
        const {value, editable, type, name} = this.props;
        let returnObject = '';
        let returnValue = '';
        let editDate = value;
        if (!editable) {
            try {
                returnValue = value.toString() || ' ';
            } catch (exception) {
                returnValue = ' ';
            }
            returnObject = (<div className="editable-row-text">{returnValue}</div>);
        } else {
            switch (type) {
                case 'boolean': {
                    const checkActive = this.checked(value);
                    returnObject = (
                        <div>
                            <input type="checkbox" onChange={e => this.handleInputChange(e)} checked={checkActive}/>
                        </div>);
                    break;
                }
                case 'datetime': {
                    if (value === null) {
                        editDate = moment().format('YYYY-MM-DD HH:mm:ss');
                    }
                    returnObject = (<DatePicker
                        showTime
                        format="YYYY-MM-DD HH:mm:ss"
                        locale={this.state.locale.calendar}
                        placeholder="Select Time"
                        onChange={this.onChangeDate}
                        onOk={this.onOkDate}
                        defaultValue={moment()}
                    />);
                    break;
                }
                default: {
                    returnObject = (<div><Input value={value} onChange={e => this.handleInputChange(e)}/></div>);
                }

            }
        }
        return (
            <div>
                {returnObject}
            </div>
        );
    }
}

EditableCell.propTypes = {
    value: PropTypes.string.isRequired,
    editable: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default EditableCell;
