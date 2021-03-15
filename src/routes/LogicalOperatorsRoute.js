import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'

import LogicalOperatorsPage from '../pages/logicalOperatorsPages/LogicalOperatorsPage'
import CreateLogicalOperatorPage from '../pages/logicalOperatorsPages/CreateLogicalOperatorPage'
import UpdateLogicalOperatorPage from '../pages/logicalOperatorsPages/UpdateLogicalOperatorPage'

export default function LogicalOperatorsRoute() {
    const { path } = useRouteMatch()

    return (
        <Switch>
            <Route exact path={path}>
                <LogicalOperatorsPage />
            </Route>
            <Route exact path={`${path}/create`}>
                <CreateLogicalOperatorPage />
            </Route>
            <Route exact path={`${path}/:logicalOperatorId/edit`}>
                <UpdateLogicalOperatorPage />
            </Route>
        </Switch>
    )
}
