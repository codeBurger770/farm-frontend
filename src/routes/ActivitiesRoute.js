import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'

import ActivitiesPage from '../pages/activitiesPages/ActivitiesPage'
import CreateActivityPage from '../pages/activitiesPages/CreateActivityPage'
import UpdateActivityPage from '../pages/activitiesPages/UpdateActivityPage'

export default function ActivitiesRoute() {
    const { path } = useRouteMatch()

    return (
        <Switch>
            <Route exact path={path}>
                <ActivitiesPage />
            </Route>
            <Route exact path={`${path}/create`}>
                <CreateActivityPage />
            </Route>
            <Route exact path={`${path}/:activityId/edit`}>
                <UpdateActivityPage />
            </Route>
        </Switch>
    )
}
