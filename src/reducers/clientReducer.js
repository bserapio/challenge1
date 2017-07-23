import * as types from '../actions/actionTypes';
import initialState from './initialState';


export default function clientReducer(state = initialState, action) {
    switch (action.type) {

        default: {
            return state;
        }

    }
}
