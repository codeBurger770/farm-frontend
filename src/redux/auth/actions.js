import {
    SET_ACCESS_TOKEN,
    SET_REFRESH_TOKEN
} from './types'

export const setAccessTokenAction = accessToken => ({
    type: SET_ACCESS_TOKEN,
    payload: {
        accessToken
    }
})

export const setRefreshTokenAction = refreshToken => ({
    type: SET_REFRESH_TOKEN,
    payload: {
        refreshToken
    }
})
