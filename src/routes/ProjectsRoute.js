import React, { useEffect } from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { setProjectsThunk } from '../redux/projects/thunks'
import ProjectsPage from '../pages/projectsPages/ProjectsPage'
import CreateProjectPage from '../pages/projectsPages/CreateProjectPage'
import UpdateProjectPage from '../pages/projectsPages/UpdateProjectPage'
import ProjectIdRoute from './ProjectIdRoute'

export default function ProjectsRoute() {
    const { path } = useRouteMatch()

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setProjectsThunk())
    }, [dispatch])

    return (
        <Switch>
            <Route exact path={path}>
                <ProjectsPage />
            </Route>
            <Route exact path={`${path}/create`}>
                <CreateProjectPage />
            </Route>
            <Route exact path={`${path}/:projectId/edit`}>
                <UpdateProjectPage />
            </Route>
            <Route path={`${path}/:projectId`}>
                <ProjectIdRoute />
            </Route>
        </Switch>
    )
}
