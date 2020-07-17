import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import SignInPage from '../pages/authPages/SignInPage'
import SignUpPage from '../pages/authPages/SignUpPage'
import ChangePasswordPage from '../pages/authPages/ChangePasswordPage'

export default function MainRoute() {
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
