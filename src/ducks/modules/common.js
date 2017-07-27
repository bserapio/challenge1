import connectService from '../services/connect';

const DEFAULT_PATH = 'dashboard/common';

export const REQUEST_CONFIG = `${{DEFAULT_PATH}}/REQUEST_CONFIG`;
export const OK_CONFIG = `${{DEFAULT_PATH}}/OK_CONFIG`;
export const KO_CONFIG = `${{DEFAULT_PATH}}/KO_CONFIG`;
export const ERROR_CONFIG = `${{DEFAULT_PATH}}/ERROR_CONFIG`;
const initialState = {
    config: null,
};

export function getConfig() {
    return dispatch => {
        dispatch({
            type: REQUEST_CONFIG,
            payload: {},
        });
        let config = localStorage.getItem('config');
        if (config) {
            config = JSON.parse(config);

            return dispatch(
                {
                    type: OK_CONFIG,
                    payload: {config},
                }
            );
        }
        return connectService.getConfig()
            .then(
                res => {
                    config = res.data;

                    localStorage.setItem('config', JSON.stringify(config));
                    return dispatch(
                        {
                            type: OK_CONFIG,
                            payload: {config},
                        }
                    );
                },
                err => dispatch(
                        {
                            type: KO_CONFIG,
                            payload: err,
                        }
                )
            )
            .catch(error => {
                dispatch(
                    {
                        type: ERROR_CONFIG,
                        payload: error,
                    }
                );
            });
    };
}

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case OK_CONFIG: {
            const {config} = action.payload;
            return {
                ...state,
                config,

            };
        }

        default:
            return state;

    }
}
