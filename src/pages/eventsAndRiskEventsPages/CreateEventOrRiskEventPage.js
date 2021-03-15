import React, { useEffect } from 'react'
import { NavLink, Link, Redirect, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Input from '../../components/Input'
import TextArea from '../../components/TextArea'
import Select from '../../components/Select'
import { resetAction, setTypeAction, setDescriptionAction, setProbabilityAction, setConsequencesAction } from '../../redux/forms/actions'
import { createEventOrRiskEventThunk } from '../../redux/currentProject/thunks'

export default function CreateEventOrRiskEventPage() {
    const { projectId } = useParams()

    const dispatch = useDispatch()
    const forms = useSelector(state => state.forms)

    useEffect(() => {
        dispatch(setTypeAction('EVENT'))
        return () => dispatch(resetAction())
    }, [dispatch])

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(createEventOrRiskEventThunk(projectId))
    }

    if (forms.isFinish) {
        return (
            <Redirect to={`/projects/${projectId}/events-and-risk-events`} />
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
                            <NavLink className="nav-link" exact to={`/projects/${projectId}/events-and-risk-events`} activeClassName="active">События и риск-события</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" exact to={`/projects/${projectId}/events-and-risk-events/create`} activeClassName="active">Создать cобытие или риск-событие</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" exact to={`/projects/${projectId}/logical-operators`} activeClassName="active">Логические операторы</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" exact to={`/projects/${projectId}/logical-operators/create`} activeClassName="active">Создать логический оператор</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" exact to={`/projects/${projectId}/activities`} activeClassName="active">Мероприятия</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" exact to={`/projects/${projectId}/activities/create`} activeClassName="active">Создать мероприятие</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" exact to={`/projects/${projectId}/risk-managment`} activeClassName="active">Управление рисками</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" exact to="/signout" activeClassName="active">Выход</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>

            <div className="container-fluid py-3">
                <h1 className="mb-3">Создать событие или риск-событие</h1>
                <form onSubmit={handleSubmit}>
                    <Select
                        id="type"
                        label="Тип"
                        value={forms.type}
                        handleChange={e => dispatch(setTypeAction(e.target.value))}
                        options={[
                            { label: 'Событие', value: 'EVENT' },
                            { label: 'Риск-событие', value: 'RISK_EVENT' }
                        ]}
                        required
                    />
                    <TextArea
                        id="description"
                        label="Описание"
                        value={forms.description}
                        handleChange={e => dispatch(setDescriptionAction(e.target.value))}
                        rows="3"
                    />
                    <Input
                        id="probability"
                        label="Вероятность"
                        value={forms.probability}
                        handleChange={e => dispatch(setProbabilityAction(e.target.value))}
                        type="number"
                        required
                    />
                    {forms.type === 'RISK_EVENT' && (
                        <Input
                            id="consequences"
                            label="Последствия"
                            value={forms.consequences}
                            handleChange={e => dispatch(setConsequencesAction(e.target.value))}
                            type="number"
                            required
                        />
                    )}
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
