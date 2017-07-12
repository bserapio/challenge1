import * as types from '../actions/actionTypes';
import initialState from './initialState';


export default function clientReducer(state = initialState, action) {
    switch (action.type) {
        case types.GET_CLIENTS_SUCCESS:

            const {clients} = action.payload;

            return {
                ...state,
                clients: clients
            };
            break;

        default:
            return state;
    }
}