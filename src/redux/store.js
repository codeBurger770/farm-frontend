import { combineReducers, applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import formsReducer from './forms/reducer'
import authReducer from './auth/reducer'

const rootReducer = combineReducers({
    forms: formsReducer,
    auth: authReducer
})

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
