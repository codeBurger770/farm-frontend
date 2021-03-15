import React, { useEffect } from 'react'
import { NavLink, Link, Redirect, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Input from '../../components/Input'
import TextArea from '../../components/TextArea'
import { resetAction, setNameAction, setDescriptionAction } from '../../redux/forms/actions'
import { updateProjectThunk } from '../../redux/projects/thunks'

export default function UpdateProjectPage() {
    const { projectId } = useParams()

    const dispatch = useDispatch()
    const { forms, projects } = useSelector(state => ({
        forms: state.forms,
        projects: state.projects
    }))

    useEffect(() => {
        const project = projects.find(project => project.id === projectId)
        dispatch(setNameAction(project.name))
        dispatch(setDescriptionAction(project.description))
    }, [dispatch, projects, projectId])

    useEffect(() => () => dispatch(resetAction()), [dispatch])

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(updateProjectThunk(projectId))
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
                <h1 className="mb-3">Изменить проект</h1>
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
                        <span className={forms.isLoading ? 'pl-2' : ''}>Изменить</span>
                    </button>
                </form>
            </div>
        </>
    )
}
