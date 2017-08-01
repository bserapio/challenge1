
const DEFAULT_PATH = 'dashboard/common';

export const REQUEST_CONFIG = `${{DEFAULT_PATH}}/REQUEST_CONFIG`;
export const REQUEST_CONFIG_SUCCESS = `${{DEFAULT_PATH}}/REQUEST_CONFIG_SUCCESS`;
export const REQUEST_CONFIG_ERROR = `${{DEFAULT_PATH}}/REQUEST_CONFIG_ERROR`;

const initialState = {
    config: null,
};

export const getConfigAction = () => {
    const configStorage = localStorage.getItem('config');
    if (configStorage) {
        const config = {};
        config.data = JSON.parse(configStorage);
        return dispatch => {
            dispatch({
                type: REQUEST_CONFIG_SUCCESS,
                payload: config,

            });
        };
    }

    return {
        types: [REQUEST_CONFIG, REQUEST_CONFIG_SUCCESS, REQUEST_CONFIG_ERROR],
        client: 'default',
        payload: {
            request: {
                method: 'GET',
                url: 'common/config',

            },
        },
    };
};

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case REQUEST_CONFIG_SUCCESS: {
            const config = action.payload.data;
            localStorage.setItem('config', JSON.stringify(config));
            return {
                ...state,
                config,

            };
        }

        default:
            return state;

    }
}
