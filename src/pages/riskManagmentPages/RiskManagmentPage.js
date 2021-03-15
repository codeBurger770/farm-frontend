import React, { useEffect } from 'react'
import { NavLink, Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Graphviz } from 'graphviz-react'

import { setEventsAndRiskEventsAndLogicalOperatorsAndActivitiesAction, setIsActiveForEventOrRiskEvent, setIsActiveForActivity } from '../../redux/riskManagment/actions'

export default function RiskManagmentPage() {
    const { projectId } = useParams()

    const dispatch = useDispatch()
    const { currentProject, riskManagment } = useSelector(state => ({
        currentProject: state.currentProject,
        riskManagment: state.riskManagment
    }))

    useEffect(() => {
        dispatch(setEventsAndRiskEventsAndLogicalOperatorsAndActivitiesAction(currentProject.eventsAndRiskEvents, currentProject.logicalOperators, currentProject.activities))
    }, [dispatch, currentProject.eventsAndRiskEvents, currentProject.logicalOperators, currentProject.activities])

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
                <h1 className="mb-3">Управление рисками</h1>
                <div className="row">
                    <div className="col-12 col-lg-6">
                        <div className="shadow p-3 mb-5 bg-white rounded">
                            <Graphviz dot={riskManagment.dotStructure} options={{ width: '100%', height: 400, zoom: true }} />
                        </div>
                    </div>
                    <div className="col-12 col-lg-6">
                        <div className="shadow p-3 mb-5 bg-white rounded">
                            <Graphviz dot={riskManagment.dotSystem} options={{ width: '100%', height: 400, zoom: true }} />
                        </div>
                    </div>
                </div>

                <p className="h4">Расходы на мероприятия: {riskManagment.totalCosts} &#8381;</p>
                <p className="h4">Общие последствия: {riskManagment.totalConsequences} &#8381;</p>

                <div className="accordion py-3" id="accordion">
                    <div className="card">
                        <div className="card-header" id="headingOne">
                            <h2 className="mb-0">
                                <button className="btn btn-link btn-block text-left" data-toggle="collapse" data-target="#collapseOne">События и риск-события</button>
                            </h2>
                        </div>
                        <div id="collapseOne" className="collapse" data-parent="#accordion">
                            <div className="card-body">
                                {!riskManagment.eventsAndRiskEvents.length ? (
                                    <div>Событий и риск-событий пока нет...</div>
                                ) : (
                                        <div className="table-responsive">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>Тег</th>
                                                        <th>Тип</th>
                                                        <th>Описание</th>
                                                        <th>Исходная вероятность</th>
                                                        <th>Текущая вероятность</th>
                                                        <th>Последствия</th>
                                                        <th>Удалено</th>
                                                        <th>Действия</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {riskManagment.eventsAndRiskEvents.map(eventOrRiskEvent => (
                                                        <tr key={eventOrRiskEvent.id}>
                                                            <td>{eventOrRiskEvent.tag}</td>
                                                            <td>{eventOrRiskEvent.type === 'EVENT' ? 'Событие' : 'Риск-событие'}</td>
                                                            <td>{eventOrRiskEvent.description}</td>
                                                            <td>{eventOrRiskEvent.probability.toFixed(3).replace(/0*$/, '').replace(/\.$/, '')}</td>
                                                            <td>{eventOrRiskEvent.currentProbability.toFixed(3).replace(/0*$/, '').replace(/\.$/, '')}</td>
                                                            <td>{eventOrRiskEvent.consequences}</td>
                                                            <td>{eventOrRiskEvent.deleteLinks > 0 ? 'Да' : 'Нет'}</td>
                                                            <td>
                                                                {!riskManagment.logicalOperators.filter(logicalOperator => logicalOperator.deleteLinks === 0).find(({ outputEventOrRiskEventId }) => outputEventOrRiskEventId === eventOrRiskEvent.id) && eventOrRiskEvent.deleteLinks === 0 && (
                                                                    <div className="d-flex">
                                                                        {!eventOrRiskEvent.isActive ? (
                                                                            <button className="btn btn-primary" disabled={eventOrRiskEvent.deleteLinks > 0} onClick={() => dispatch(setIsActiveForEventOrRiskEvent(eventOrRiskEvent.id, true))}>
                                                                                <svg className="bi bi-check" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                                    <path fillRule="evenodd" d="M13.854 3.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3.5-3.5a.5.5 0 11.708-.708L6.5 10.293l6.646-6.647a.5.5 0 01.708 0z" clipRule="evenodd" />
                                                                                </svg>
                                                                            </button>
                                                                        ) : (
                                                                                <button className="btn btn-danger" onClick={() => dispatch(setIsActiveForEventOrRiskEvent(eventOrRiskEvent.id, false))}>
                                                                                    <svg className="bi bi-x" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                                        <path fillRule="evenodd" d="M11.854 4.146a.5.5 0 010 .708l-7 7a.5.5 0 01-.708-.708l7-7a.5.5 0 01.708 0z" clipRule="evenodd" />
                                                                                        <path fillRule="evenodd" d="M4.146 4.146a.5.5 0 000 .708l7 7a.5.5 0 00.708-.708l-7-7a.5.5 0 00-.708 0z" clipRule="evenodd" />
                                                                                    </svg>
                                                                                </button>
                                                                            )}
                                                                    </div>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header" id="headingTwo">
                            <h2 className="mb-0">
                                <button className="btn btn-link btn-block text-left collapsed" data-toggle="collapse" data-target="#collapseTwo">Логические операторы</button>
                            </h2>
                        </div>
                        <div id="collapseTwo" className="collapse" data-parent="#accordion">
                            <div className="card-body">
                                {!riskManagment.logicalOperators.length ? (
                                    <div>Логических операторов пока нет...</div>
                                ) : (
                                        <div className="table-responsive">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>Тег</th>
                                                        <th>Тип</th>
                                                        <th>Тег первого входного события или риск-события</th>
                                                        <th>Тег второго входного события или риск-события</th>
                                                        <th>Тег выходного события или риск-события</th>
                                                        <th>Удалено</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {riskManagment.logicalOperators.map(logicalOperator => (
                                                        <tr key={logicalOperator.id}>
                                                            <td>{logicalOperator.tag}</td>
                                                            <td>{logicalOperator.type === 'AND' ? 'И' : 'ИЛИ'}</td>
                                                            <td>{riskManagment.eventsAndRiskEvents.find(eventOrRiskEvent => eventOrRiskEvent.id === logicalOperator.firstInputEventOrRiskEventId).tag}</td>
                                                            <td>{riskManagment.eventsAndRiskEvents.find(eventOrRiskEvent => eventOrRiskEvent.id === logicalOperator.secondInputEventOrRiskEventId).tag}</td>
                                                            <td>{riskManagment.eventsAndRiskEvents.find(eventOrRiskEvent => eventOrRiskEvent.id === logicalOperator.outputEventOrRiskEventId).tag}</td>
                                                            <td>{logicalOperator.deleteLinks > 0 ? 'Да' : 'Нет'}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header" id="headingThree">
                            <h2 className="mb-0">
                                <button className="btn btn-link btn-block text-left collapsed" data-toggle="collapse" data-target="#collapseThree">Мероприятия</button>
                            </h2>
                        </div>
                        <div id="collapseThree" className="collapse" data-parent="#accordion">
                            <div className="card-body">
                                {!riskManagment.activities.length ? (
                                    <div>Мероприятий пока нет...</div>
                                ) : (
                                        <div className="table-responsive">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>Тег</th>
                                                        <th>Тип</th>
                                                        <th>Тег события или риск-события или логического оператора</th>
                                                        <th>Описание</th>
                                                        <th>Стоимость</th>
                                                        <th>Изменить вероятность на</th>
                                                        <th>Изменить последствия на</th>
                                                        <th>Действия</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {riskManagment.activities.map(activity => (
                                                        <tr key={activity.id}>
                                                            <td>{activity.tag}</td>
                                                            <td>{
                                                                activity.type === 'DELETE_EVENT_OR_RISK_EVENT'
                                                                    ? 'Удалить событие или риск-событие'
                                                                    : activity.type === 'UPDATE_EVENT_OR_RISK_EVENT'
                                                                        ? 'Изменить событие или риск-событие'
                                                                        : 'Удалить логический оператор'
                                                            }</td>
                                                            <td>{
                                                                activity.type === 'DELETE_LOGICAL_OPERATOR'
                                                                    ? riskManagment.logicalOperators.find(logicalOperator => logicalOperator.id === activity.logicalOperatorId).tag
                                                                    : riskManagment.eventsAndRiskEvents.find(eventOrRiskEvent => eventOrRiskEvent.id === activity.eventOrRiskEventId).tag
                                                            }</td>
                                                            <td>{activity.description}</td>
                                                            <td>{activity.cost}</td>
                                                            <td>{activity.type === 'UPDATE_EVENT_OR_RISK_EVENT' ? activity.probability : '-'}</td>
                                                            <td>{activity.type === 'UPDATE_EVENT_OR_RISK_EVENT' ? activity.consequences : '-'}</td>
                                                            <td>
                                                                <div className="d-flex">
                                                                    {!activity.isActive ? (
                                                                        <button className="btn btn-primary" onClick={() => dispatch(setIsActiveForActivity(activity.id, true))}>
                                                                            <svg className="bi bi-check" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                                <path fillRule="evenodd" d="M13.854 3.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3.5-3.5a.5.5 0 11.708-.708L6.5 10.293l6.646-6.647a.5.5 0 01.708 0z" clipRule="evenodd" />
                                                                            </svg>
                                                                        </button>
                                                                    ) : (
                                                                            <button className="btn btn-danger" onClick={() => dispatch(setIsActiveForActivity(activity.id, false))}>
                                                                                <svg className="bi bi-x" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                                    <path fillRule="evenodd" d="M11.854 4.146a.5.5 0 010 .708l-7 7a.5.5 0 01-.708-.708l7-7a.5.5 0 01.708 0z" clipRule="evenodd" />
                                                                                    <path fillRule="evenodd" d="M4.146 4.146a.5.5 0 000 .708l7 7a.5.5 0 00.708-.708l-7-7a.5.5 0 00-.708 0z" clipRule="evenodd" />
                                                                                </svg>
                                                                            </button>
                                                                        )}
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
