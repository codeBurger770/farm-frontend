import React, { useEffect } from 'react'
import { NavLink, Link, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Input from '../../components/Input'
import { resetAction, setEmailAction, setPasswordAction } from '../../redux/forms/actions'
import { signInThunk } from '../../redux/auth/thunks'

export default function SignInPage() {
    const dispatch = useDispatch()
    const forms = useSelector(state => state.forms)

    useEffect(() => () => dispatch(resetAction()), [dispatch])

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(signInThunk())
    }

    if (forms.isFinish) {
        return (
            <Redirect to="/projects" />
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
                <h1 className="mb-3">Вход</h1>
                <form onSubmit={handleSubmit}>
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
                    <div className="form-group">
                        <button
                            type="submit"
                            className={`btn btn-primary ${forms.isLoading && 'd-flex align-items-center'}`}
                            disabled={forms.isLoading}
                        >
                            {forms.isLoading && <span className="spinner-border spinner-border-sm"></span>}
                            <span className={forms.isLoading ? 'pl-2' : ''}>Войти</span>
                        </button>
                    </div>
                    <Link to="/change-password">Сменить пароль</Link>
                </form>
            </div>
        </>
    )
}
