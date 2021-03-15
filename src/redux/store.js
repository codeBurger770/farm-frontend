import { combineReducers, applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import formsReducer from './forms/reducer'
import authReducer from './auth/reducer'
import projectsReducer from './projects/reducer'
import currentProjectReducer from './currentProject/reducer'
import riskManagmentReducer from './riskManagment/reducer'

const rootReducer = combineReducers({
    forms: formsReducer,
    auth: authReducer,
    projects: projectsReducer,
    currentProject: currentProjectReducer,
    riskManagment: riskManagmentReducer
})

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
