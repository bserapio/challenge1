
const DEFAULT_PATH = 'dashboard/user';
export const CREATE_USER_REQUEST = `${{ DEFAULT_PATH }}/CREATE_USER_REQUEST`;
export const CREATE_USER_SUCCESS = `${{ DEFAULT_PATH }}/CREATE_USER_SUCCESS`;
export const CREATE_USER_ERROR = `${{ DEFAULT_PATH }}/CREATE_USER_ERROR`;
export const ERROR_CREATE_USER = `${{ DEFAULT_PATH }}/ERROR_CREATE_USER`;
export const GET_USERS_SUCCESS = `${{ DEFAULT_PATH }}/GET_USERS_SUCCESS`;
export const GET_USERS_ERROR = `${{ DEFAULT_PATH }}/GET_USERS_SUCCESS`;
export const GET_USERS_REQUEST = `${{ DEFAULT_PATH }}/GET_USERS_REQUEST`;

export const getUserAction = () => ({
    types: [GET_USERS_REQUEST, GET_USERS_SUCCESS, GET_USERS_ERROR],
    client: 'default',
    payload: {
        request: {
            method: 'GET',
            url: '/services/user',

        },
    },
});


export const createUserAction = data => ({

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
        case GET_USERS_ERROR: {
            console.log(action.payload);
            return {...state};
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
