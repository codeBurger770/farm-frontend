import React, { useEffect } from 'react'
import { NavLink, Link, Redirect, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Input from '../../components/Input'
import TextArea from '../../components/TextArea'
import Select from '../../components/Select'
import { resetAction, setTypeAction, setEventOrRiskEventOrLogicalOperatorIdAction, setDescriptionAction, setCostAction, setProbabilityAction, setConsequencesAction } from '../../redux/forms/actions'
import { createActivityThunk } from '../../redux/currentProject/thunks'

export default function CreateActivityPage() {
    const { projectId } = useParams()

    const dispatch = useDispatch()
    const { forms, eventsAndRiskEvents, logicalOperators } = useSelector(state => ({
        forms: state.forms,
        ...state.currentProject
    }))

    useEffect(() => {
        dispatch(setTypeAction('DELETE_EVENT_OR_RISK_EVENT'))
        return () => dispatch(resetAction())
    }, [dispatch])

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(createActivityThunk(projectId))
    }

    if (forms.isFinish) {
        return (
            <Redirect to={`/projects/${projectId}/activities`} />
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
                <h1 className="mb-3">Создать мероприятие</h1>
                <form onSubmit={handleSubmit}>
                    <Select
                        id="type"
                        label="Тип"
                        value={forms.type}
                        handleChange={e => dispatch(setTypeAction(e.target.value))}
                        options={[
                            { label: 'Удалить событие или риск-событие', value: 'DELETE_EVENT_OR_RISK_EVENT' },
                            { label: 'Изменить событие или риск-событие', value: 'UPDATE_EVENT_OR_RISK_EVENT' },
                            { label: 'Удалить логический оператор', value: 'DELETE_LOGICAL_OPERATOR' }
                        ]}
                        required
                    />
                    <Select
                        id="eventOrRiskEventOrLogicalOperatorId"
                        label="Тег события или риск-события или логического оператора"
                        value={forms.eventOrRiskEventOrLogicalOperatorId}
                        handleChange={e => dispatch(setEventOrRiskEventOrLogicalOperatorIdAction(e.target.value))}
                        options={[{
                            label: 'Выберите...',
                            value: ''
                        }, ...(forms.type === 'DELETE_LOGICAL_OPERATOR'
                            ? logicalOperators.map(({ id, tag }) => ({
                                label: tag,
                                value: id
                            }))
                            : eventsAndRiskEvents.map(({ id, tag }) => ({
                                label: tag,
                                value: id
                            }))
                        )]}
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
                        id="cost"
                        label="Стоимость"
                        value={forms.cost}
                        handleChange={e => dispatch(setCostAction(e.target.value))}
                        type="number"
                        required
                    />
                    {forms.type === 'UPDATE_EVENT_OR_RISK_EVENT' && (
                        <>
                            <Input
                                id="probability"
                                label="Изменить вероятность на"
                                value={forms.probability}
                                handleChange={e => dispatch(setProbabilityAction(e.target.value))}
                                type="number"
                                required
                            />
                            <Input
                                id="consequences"
                                label="Изменить последствия на"
                                value={forms.consequences}
                                handleChange={e => dispatch(setConsequencesAction(e.target.value))}
                                type="number"
                                required
                            />
                        </>
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
