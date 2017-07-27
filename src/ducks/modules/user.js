
import connectService from '../services/connect';

const DEFAULT_PATH = 'dashboard/user';
export const CREATE_USER = `${{DEFAULT_PATH}}/CREATE_USER`;
export const ERROR_CREATE_USER = `${{DEFAULT_PATH}}/ERROR_CREATE_USER`;
export const GET_USERS_SUCCESS = `${{DEFAULT_PATH}}/GET_USERS_SUCCESS`;
export const GET_USERS_ERROR = `${{DEFAULT_PATH}}/GET_USERS_SUCCESS`;
export const GET_USERS_REQUEST = `${{DEFAULT_PATH}}/GET_USERS_REQUEST`;

export function getUsers(role) {
    return dispatch => {
        if (role === 'user') {
            return null;
        }

        dispatch({
            type: GET_USERS_REQUEST,
            payload: {},
        });

        return connectService.getUsers().then(
            res => {
                const users = res.data;
                dispatch({
                    type: GET_USERS_SUCCESS,
                    payload: {users},
                });
            },
            err => {
                dispatch({
                    type: GET_USERS_ERROR,
                    payload: {err},
                });
            }
        );
    };
}

export function createNewUser(data) {
    return dispatch => connectService.createUser(data).then(
        res => {
            dispatch({
                type: CREATE_USER,
                payload: {res},
            });
            dispatch(getUsers());
            return res;
        },
        err => {
            dispatch({
                type: ERROR_CREATE_USER,
                payload: {err},
            });
            throw err;
        }
    ).catch(err => {
        dispatch({
            type: ERROR_CREATE_USER,
            payload: {err},
        });
    });
}

const initialState = {
    users: [],
    createError: null,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case GET_USERS_SUCCESS: {
            const {users} = action.payload;
            console.log(users);
            return {
                ...state,
                createError: null,
                apiError: null,
                users,
            };
        }
        case ERROR_CREATE_USER: {
            const {createError} = action.payload;
            return {
                ...state,
                createError,
            };
        }


        default: {
            return state;
        }
    }
}
