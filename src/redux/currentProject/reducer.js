import {
    SET_EVENTS_AND_RISK_EVENTS_AND_LOGICAL_OPERATORS_AND_ACTIVITIES,
    CREATE_EVENT_OR_RISK_EVENT,
    UPDATE_EVENT_OR_RISK_EVENT,
    DELETE_EVENT_OR_RISK_EVENT,
    CREATE_LOGICAL_OPERATOR,
    UPDATE_LOGICAL_OPERATOR,
    DELETE_LOGICAL_OPERATOR,
    CREATE_ACTIVITY,
    UPDATE_ACTIVITY,
    DELETE_ACTIVITY
} from './types'

const initialState = {
    eventsAndRiskEvents: [],
    logicalOperators: [],
    activities: []
}

export default function currentProjectReducer(state = initialState, action) {
    switch (action.type) {
        case SET_EVENTS_AND_RISK_EVENTS_AND_LOGICAL_OPERATORS_AND_ACTIVITIES:
            return {
                ...state,
                ...action.payload
            }
        case CREATE_EVENT_OR_RISK_EVENT:
            return {
                ...state,
                eventsAndRiskEvents: [
                    ...state.eventsAndRiskEvents,
                    {
                        ...action.payload
                    }
                ]
            }
        case UPDATE_EVENT_OR_RISK_EVENT:
            return {
                ...state,
                eventsAndRiskEvents: state.eventsAndRiskEvents.map(eventOrRiskEvent => {
                    if (eventOrRiskEvent.id === action.payload.id) {
                        return {
                            ...action.payload
                        }
                    }
                    return eventOrRiskEvent
                })
            }
        case DELETE_EVENT_OR_RISK_EVENT: {
            let activities = state.activities.filter(activity => activity.eventOrRiskEventId !== action.payload.id)
            const logicalOperators = state.logicalOperators.filter(logicalOperator => {
                if (
                    logicalOperator.firstInputEventOrRiskEventId === action.payload.id
                    || logicalOperator.secondInputEventOrRiskEventId === action.payload.id
                    || logicalOperator.outputEventOrRiskEventId === action.payload.id
                ) {
                    activities = activities.filter(activity => activity.logicalOperatorId !== logicalOperator.id)
                    return false
                } else {
                    return true
                }
            })

            return {
                ...state,
                eventsAndRiskEvents: state.eventsAndRiskEvents.filter(eventOrRiskEvent => eventOrRiskEvent.id !== action.payload.id),
                logicalOperators,
                activities
            }
        }
        case CREATE_LOGICAL_OPERATOR:
            return {
                ...state,
                logicalOperators: [
                    ...state.logicalOperators,
                    {
                        ...action.payload
                    }
                ]
            }
        case UPDATE_LOGICAL_OPERATOR: {
            return {
                ...state,
                logicalOperators: state.logicalOperators.map(logicalOperator => {
                    if (logicalOperator.id === action.payload.id) {
                        return {
                            ...action.payload
                        }
                    }
                    return logicalOperator
                })
            }
        }
        case DELETE_LOGICAL_OPERATOR:
            return {
                ...state,
                logicalOperators: state.logicalOperators.filter(logicalOperator => logicalOperator.id !== action.payload.id),
                activities: state.activities.filter(activity => activity.logicalOperatorId !== action.payload.id)
            }
        case CREATE_ACTIVITY:
            return {
                ...state,
                activities: [
                    ...state.activities,
                    {
                        ...action.payload
                    }
                ]
            }
        case UPDATE_ACTIVITY:
            return {
                ...state,
                activities: state.activities.map(activity => {
                    if (activity.id === action.payload.id) {
                        return {
                            ...action.payload
                        }
                    }
                    return activity
                })
            }
        case DELETE_ACTIVITY:
            return {
                ...state,
                activities: state.activities.filter(activity => activity.id !== action.payload.id)
            }
        default:
            return state
    }
}
