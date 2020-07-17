import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

import SignInPage from '../pages/authPages/SignInPage'
import SignUpPage from '../pages/authPages/SignUpPage'
import ChangePasswordPage from '../pages/authPages/ChangePasswordPage'

export default function MainRoute() {
    const { accessToken } = useSelector(state => state.auth)

    if (accessToken) {
        return (
            <Switch>
                <Route path="/projects">
                    <div>Projects</div>
                </Route>
                <Route exact path="/signout">
                    <div>SignOut</div>
                </Route>
                <Route>
                    <Redirect to="/projects" />
                </Route>
            </Switch>
        )
    }

    return (
        <Switch>
            <Route exact path="/signin">
                <SignInPage />
            </Route>
            <Route exact path="/signup">
                <SignUpPage />
            </Route>
            <Route exact path="/change-password">
                <ChangePasswordPage />
            </Route>
            <Route>
                <Redirect to="/signin" />
            </Route>
        </Switch>
    )
}
