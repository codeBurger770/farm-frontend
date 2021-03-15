import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'

import EventsAndRiskEventsPage from '../pages/eventsAndRiskEventsPages/EventsAndRiskEventsPage'
import CreateEventOrRiskEventPage from '../pages/eventsAndRiskEventsPages/CreateEventOrRiskEventPage'
import UpdateEventOrRiskEventPage from '../pages/eventsAndRiskEventsPages/UpdateEventOrRiskEventPage'

export default function EventsAndRiskEventsRoute() {
    const { path } = useRouteMatch()

    return (
        <Switch>
            <Route exact path={path}>
                <EventsAndRiskEventsPage />
            </Route>
            <Route exact path={`${path}/create`}>
                <CreateEventOrRiskEventPage />
            </Route>
            <Route exact path={`${path}/:eventOrRiskEventId/edit`}>
                <UpdateEventOrRiskEventPage />
            </Route>
        </Switch>
    )
}
