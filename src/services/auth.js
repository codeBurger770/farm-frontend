export const signUp1Service = async (email, password) => {
    const response = await fetch('http://localhost:3001/api/auth/signup-1', {
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
    const response = await fetch('http://localhost:3001/api/auth/signup-2', {
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

export const signInService = async (email, password) => {
    const response = await fetch('http://localhost:3001/api/auth/signin', {
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

export const changePassword1Service = async email => {
    const response = await fetch('http://localhost:3001/api/auth/change-password-1', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            email
        })
    })

    return await response.json()
}

export const changePassword2Service = async (email, password, confirmationCode) => {
    const response = await fetch('http://localhost:3001/api/auth/change-password-2', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            email,
            password,
            confirmationCode
        })
    })

    return await response.json()
}
