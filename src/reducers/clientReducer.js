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

        case types.SEARCH_FILTER:

            const {searchText} = action.payload;
            return {
                ...state,
                searchText
            }

        default:
            return state;
    }
}