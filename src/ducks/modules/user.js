import { AxiosRequestConfig, AxiosResponse } from 'axios';

const DEFAULT_PATH = 'dashboard/user';
export const CREATE_USER_REQUEST = `${{ DEFAULT_PATH }}/CREATE_USER_REQUEST`;
export const CREATE_USER_SUCCESS = `${{ DEFAULT_PATH }}/CREATE_USER_SUCCESS`;
export const CREATE_USER_ERROR = `${{ DEFAULT_PATH }}/CREATE_USER_ERROR`;
export const ERROR_CREATE_USER = `${{ DEFAULT_PATH }}/ERROR_CREATE_USER`;
export const GET_USERS_SUCCESS = `${{ DEFAULT_PATH }}/GET_USERS_SUCCESS`;
export const GET_USERS_ERROR = `${{ DEFAULT_PATH }}/GET_USERS_SUCCESS`;
export const GET_USERS_REQUEST = `${{ DEFAULT_PATH }}/GET_USERS_REQUEST`;


export type Action =
    {
        type: GET_USERS_REQUEST,
        payload: {
            request: AxiosRequestConfig
        }
    } | {
        type: GET_USERS_SUCCESS,
        payload: AxiosResponse
    } | {
        type: CREATE_USER_REQUEST,
        payload: {
            request: AxiosRequestConfig
        }
    } | {
        type: CREATE_USER_SUCCESS,
        payload: {
            request: AxiosResponse
        }
    };


export const getUsers = (): Action => ({

    types: [GET_USERS_REQUEST, GET_USERS_SUCCESS, GET_USERS_ERROR],
    payload: {
        request: {
            method: 'GET',
            url: '/services/user',
        },
    },
});


export const createNewUser = (data): Action => ({

    types: [CREATE_USER_REQUEST, CREATE_USER_SUCCESS, CREATE_USER_ERROR],
    payload: {
        request: {
            method: 'POST',
            url: '/services/user',
            data,

        },
    },
});


const initialState = {
    users: [],
    createError: null,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case GET_USERS_SUCCESS: {
            const users = action.payload.data;
            return {
                ...state,
                createError: null,
                apiError: null,
                users,
            };
        }
        case ERROR_CREATE_USER: {
            const { createError } = action.payload;
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
