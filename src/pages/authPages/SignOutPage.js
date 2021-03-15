import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { setAccessTokenAction, setRefreshTokenAction } from '../../redux/auth/actions'

export default function SignOutPage() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setAccessTokenAction(''))
        dispatch(setRefreshTokenAction(''))
    }, [dispatch])

    return (
        <Redirect to="/signin" />
    )
}
