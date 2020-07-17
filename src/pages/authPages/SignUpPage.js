import React, { useEffect } from 'react'
import { NavLink, Link, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Input from '../../components/Input'
import { resetAction, setEmailAction, setPasswordAction, setConfirmationCodeAction } from '../../redux/forms/actions'
import { signUp1Thunk, signUp2Thunk } from '../../redux/auth/thunks'

export default function SignUpPage() {
    const dispatch = useDispatch()
    const forms = useSelector(state => state.forms)

    useEffect(() => () => dispatch(resetAction()), [dispatch])

    const handleSubmit = e => {
        e.preventDefault()
        if (!forms.isAwaitingConfirmationCode) {
            dispatch(signUp1Thunk())
        } else {
            dispatch(signUp2Thunk())
        }
    }

    if (forms.isFinish) {
        return (
            <Redirect to="/signin" />
        )
    }

    return (
        <>
            <nav className="navbar navbar-light bg-light sticky-top">
                <Link className="navbar-brand" to="/">Farm</Link>
                <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarSupportedContent">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" exact to="/signin" activeClassName="active">Вход</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" exact to="/signup" activeClassName="active">Регистрация</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>

            <div className="container-fluid py-3">
                <h1 className="mb-3">Регистрация</h1>
                <form onSubmit={handleSubmit}>
                    {!forms.isAwaitingConfirmationCode ? (
                        <>
                            <Input
                                id="email"
                                label="Электронная почта"
                                value={forms.email}
                                handleChange={e => dispatch(setEmailAction(e.target.value))}
                                feedback={forms.emailFeedback}
                                type="email"
                                required
                            />
                            <Input
                                id="password"
                                label="Пароль"
                                value={forms.password}
                                handleChange={e => dispatch(setPasswordAction(e.target.value))}
                                feedback={forms.passwordFeedback}
                                type="password"
                                required
                            />
                        </>
                    ) : (
                            <Input
                                id="confirmationCode"
                                label="Код подтверждения"
                                value={forms.confirmationCode}
                                handleChange={e => dispatch(setConfirmationCodeAction(e.target.value))}
                                feedback={forms.confirmationCodeFeedback}
                                required
                            />
                        )}
                    <button
                        type="submit"
                        className={`btn btn-primary ${forms.isLoading && 'd-flex align-items-center'}`}
                        disabled={forms.isLoading}
                    >
                        {forms.isLoading && <span className="spinner-border spinner-border-sm"></span>}
                        <span className={forms.isLoading ? 'pl-2' : ''}>
                            {!forms.isAwaitingConfirmationCode ? 'Далее' : 'Зарегистрироваться'}
                        </span>
                    </button>
                </form>
            </div>
        </>
    )
}
