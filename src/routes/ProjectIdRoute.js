import React, { useEffect } from 'react'
import { Switch, Route, useRouteMatch, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { setEventsAndRiskEventsAndLogicalOperatorsAndActivitiesThunk } from '../redux/currentProject/thunks'
import EventsAndRiskEventsRoute from './EventsAndRiskEventsRoute'
import LogicalOperatorsRoute from './LogicalOperatorsRoute'
import ActivitiesRoute from './ActivitiesRoute'
import RiskManagmentPage from '../pages/riskManagmentPages/RiskManagmentPage'

export default function ProjectIdRoute() {
    const { path } = useRouteMatch()
    const { projectId } = useParams()

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setEventsAndRiskEventsAndLogicalOperatorsAndActivitiesThunk(projectId))
    }, [dispatch, projectId])

    return (
        <Switch>
            <Route path={`${path}/events-and-risk-events`}>
                <EventsAndRiskEventsRoute />
            </Route>
            <Route path={`${path}/logical-operators`}>
                <LogicalOperatorsRoute />
            </Route>
            <Route path={`${path}/activities`}>
                <ActivitiesRoute />
            </Route>
            <Route path={`${path}/risk-managment`}>
                <RiskManagmentPage />
            </Route>
        </Switch>
    )
}
