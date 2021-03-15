import React, { useEffect } from 'react'
import { NavLink, Link, Redirect, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Select from '../../components/Select'
import { resetAction, setTypeAction, setFirstInputEventOrRiskEventIdAction, setSecondInputEventOrRiskEventIdAction, setOutputEventOrRiskEventIdAction } from '../../redux/forms/actions'
import { updateLogicalOperatorThunk } from '../../redux/currentProject/thunks'

export default function UpdateLogicalOperatorPage() {
    const { projectId, logicalOperatorId } = useParams()

    const dispatch = useDispatch()
    const { forms, eventsAndRiskEvents, logicalOperators } = useSelector(state => ({
        forms: state.forms,
        ...state.currentProject
    }))

    useEffect(() => {
        const logicalOperator = logicalOperators.find(logicalOperator => logicalOperator.id === logicalOperatorId)
        dispatch(setTypeAction(logicalOperator.type))
        dispatch(setFirstInputEventOrRiskEventIdAction(logicalOperator.firstInputEventOrRiskEventId))
        dispatch(setSecondInputEventOrRiskEventIdAction(logicalOperator.secondInputEventOrRiskEventId))
        dispatch(setOutputEventOrRiskEventIdAction(logicalOperator.outputEventOrRiskEventId))
    }, [dispatch, logicalOperators, logicalOperatorId])

    useEffect(() => () => dispatch(resetAction()), [dispatch])

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(updateLogicalOperatorThunk(projectId, logicalOperatorId))
    }

    if (forms.isFinish) {
        return (
            <Redirect to={`/projects/${projectId}/logical-operators`} />
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
                <h1 className="mb-3">Изменить логический оператор</h1>
                <form onSubmit={handleSubmit}>
                    <Select
                        id="type"
                        label="Тип"
                        value={forms.type}
                        handleChange={e => dispatch(setTypeAction(e.target.value))}
                        options={[
                            { label: 'И', value: 'AND' },
                            { label: 'ИЛИ', value: 'OR' }
                        ]}
                        required
                    />
                    <Select
                        id="firstInputEventOrRiskEventId"
                        label="Тег первого входного события или риск-события"
                        value={forms.firstInputEventOrRiskEventId}
                        handleChange={e => dispatch(setFirstInputEventOrRiskEventIdAction(e.target.value))}
                        options={[{
                            label: 'Выберите...',
                            value: ''
                        }, ...eventsAndRiskEvents.map(({ id, tag }) => ({
                            label: tag,
                            value: id
                        }))]}
                        required
                    />
                    <Select
                        id="secondInputEventOrRiskEventId"
                        label="Тег второго входного события или риск-события"
                        value={forms.secondInputEventOrRiskEventId}
                        handleChange={e => dispatch(setSecondInputEventOrRiskEventIdAction(e.target.value))}
                        options={[{
                            label: 'Выберите...',
                            value: ''
                        }, ...eventsAndRiskEvents.map(({ id, tag }) => ({
                            label: tag,
                            value: id
                        }))]}
                        required
                    />
                    <Select
                        id="outputEventOrRiskEventId"
                        label="Тег выходного события или риск-события"
                        value={forms.outputEventOrRiskEventId}
                        handleChange={e => dispatch(setOutputEventOrRiskEventIdAction(e.target.value))}
                        options={[{
                            label: 'Выберите...',
                            value: ''
                        }, ...eventsAndRiskEvents.map(({ id, tag }) => ({
                            label: tag,
                            value: id
                        }))]}
                        required
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
