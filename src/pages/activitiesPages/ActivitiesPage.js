import React from 'react'
import { NavLink, Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { deleteActivityThunk } from '../../redux/currentProject/thunks'

export default function ActivitiesPage() {
    const { projectId } = useParams()

    const dispatch = useDispatch()
    const { eventsAndRiskEvents, logicalOperators, activities } = useSelector(state => state.currentProject)

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
                <h1 className="mb-3">Мероприятия</h1>
                {!activities.length ? (
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
                                    {activities.map(activity => (
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
                                                    ? logicalOperators.find(logicalOperator => logicalOperator.id === activity.logicalOperatorId).tag
                                                    : eventsAndRiskEvents.find(eventOrRiskEvent => eventOrRiskEvent.id === activity.eventOrRiskEventId).tag
                                            }</td>
                                            <td>{activity.description}</td>
                                            <td>{activity.cost}</td>
                                            <td>{activity.type === 'UPDATE_EVENT_OR_RISK_EVENT' ? activity.probability : '-'}</td>
                                            <td>{activity.type === 'UPDATE_EVENT_OR_RISK_EVENT' ? activity.consequences : '-'}</td>
                                            <td>
                                                <div className="d-flex">
                                                    <Link className="btn btn-primary mr-3" to={`/projects/${projectId}/activities/${activity.id}/edit`}>
                                                        <svg className="bi bi-pencil" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" d="M11.293 1.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-9 9a1 1 0 01-.39.242l-3 1a1 1 0 01-1.266-1.265l1-3a1 1 0 01.242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z" clipRule="evenodd" />
                                                            <path fillRule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 00.5.5H4v.5a.5.5 0 00.5.5H5v.5a.5.5 0 00.5.5H6v-1.5a.5.5 0 00-.5-.5H5v-.5a.5.5 0 00-.5-.5H3z" clipRule="evenodd" />
                                                        </svg>
                                                    </Link>
                                                    <button className="btn btn-danger" onClick={e => dispatch(deleteActivityThunk(projectId, activity.id))}>
                                                        <svg className="bi bi-trash" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z" />
                                                            <path fillRule="evenodd" d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" clipRule="evenodd" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
            </div>
        </>
    )
}
