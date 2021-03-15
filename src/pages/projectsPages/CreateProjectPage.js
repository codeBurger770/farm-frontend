import React, { useEffect } from 'react'
import { NavLink, Link, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Input from '../../components/Input'
import TextArea from '../../components/TextArea'
import { resetAction, setNameAction, setDescriptionAction } from '../../redux/forms/actions'
import { createProjectThunk } from '../../redux/projects/thunks'

export default function CreateProjectPage() {
    const dispatch = useDispatch()
    const forms = useSelector(state => state.forms)

    useEffect(() => () => dispatch(resetAction()), [dispatch])

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(createProjectThunk())
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
                            <NavLink className="nav-link" exact to="/projects" activeClassName="active">Проекты</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" exact to="/projects/create" activeClassName="active">Создать проект</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" exact to="/signout" activeClassName="active">Выход</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>

            <div className="container-fluid py-3">
                <h1 className="mb-3">Создать проект</h1>
                <form onSubmit={handleSubmit}>
                    <Input
                        id="name"
                        label="Название"
                        value={forms.name}
                        handleChange={e => dispatch(setNameAction(e.target.value))}
                        required
                    />
                    <TextArea
                        id="description"
                        label="Описание"
                        value={forms.description}
                        handleChange={e => dispatch(setDescriptionAction(e.target.value))}
                        rows="3"
                    />
                    <button
                        type="submit"
                        className={`btn btn-primary ${forms.isLoading && 'd-flex align-items-center'}`}
                        disabled={forms.isLoading}
                    >
                        {forms.isLoading && <span className="spinner-border spinner-border-sm"></span>}
                        <span className={forms.isLoading ? 'pl-2' : ''}>Создать</span>
                    </button>
                </form>
            </div>
        </>
    )
}
