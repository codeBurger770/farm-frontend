import { API_URI } from '../constants'

export const signUp1Service = async (email, password) => {
    const response = await fetch(`${API_URI}/auth/signup-1`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            email,
            password
        })
    })

    return await response.json()
}

export const signUp2Service = async (email, confirmationCode) => {
    const response = await fetch(`${API_URI}/auth/signup-2`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            email,
            confirmationCode
        })
    })

    return await response.json()
}
