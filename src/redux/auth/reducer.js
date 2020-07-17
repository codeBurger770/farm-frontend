import {
    SET_ACCESS_TOKEN,
    SET_REFRESH_TOKEN
} from './types'

const initialState = {
    accessToken: '',
    refreshToken: ''
}

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case SET_ACCESS_TOKEN:
            return {
                ...state,
                accessToken: action.payload.accessToken
            }
        case SET_REFRESH_TOKEN:
            return {
                ...state,
                refreshToken: action.payload.refreshToken
            }
        default:
            return state
    }
}
