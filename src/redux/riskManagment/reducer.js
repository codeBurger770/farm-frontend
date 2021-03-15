import {
    SET_EVENTS_AND_RISK_EVENTS_AND_LOGICAL_OPERATORS_AND_ACTIVITIES,
    SET_IS_ACTIVE_FOR_EVENT_OR_RISK_EVENT,
    SET_IS_ACTIVE_FOR_ACTIVITY
} from './types'

import calcAll from '../../utils/calcAll'
import getEventsAndRiskEventsWithCurrentProbabilities from '../../utils/getEventsAndRiskEventsWithCurrentProbabilities'

const initialState = {
    eventsAndRiskEvents: [],
    logicalOperators: [],
    activities: [],
    totalCosts: 0,
    totalConsequences: 0,
    dotStructure: 'digraph {}',
    dotSystem: 'digraph {}'
}

export default function riskManagmentReducer(state = initialState, action) {
    switch (action.type) {
        case SET_EVENTS_AND_RISK_EVENTS_AND_LOGICAL_OPERATORS_AND_ACTIVITIES: {
            const logicalOperators = action.payload.logicalOperators.map(logicalOperator => ({
                ...logicalOperator,
                deleteLinks: 0
            }))
            const eventsAndRiskEvents = getEventsAndRiskEventsWithCurrentProbabilities(
                action.payload.eventsAndRiskEvents.map(eventOrRiskEvent => ({
                    ...eventOrRiskEvent,
                    isActive: false,
                    deleteLinks: 0
                })),
                logicalOperators.filter(l => l.deleteLinks === 0)
            )
            const activities = action.payload.activities.map(activity => ({
                ...activity,
                isActive: false
            }))
            return {
                ...state,
                eventsAndRiskEvents,
                logicalOperators,
                activities,
                ...calcAll(
                    eventsAndRiskEvents.filter(e => e.deleteLinks === 0),
                    logicalOperators.filter(l => l.deleteLinks === 0),
                    activities
                )
            }
        }
        case SET_IS_ACTIVE_FOR_EVENT_OR_RISK_EVENT: {
            const eventsAndRiskEvents = state.eventsAndRiskEvents.map(eventOrRiskEvent => {
                if (eventOrRiskEvent.id === action.payload.id) {
                    return {
                        ...eventOrRiskEvent,
                        isActive: action.payload.isActive
                    }
                }
                return eventOrRiskEvent
            })
            return {
                ...state,
                eventsAndRiskEvents,
                ...calcAll(
                    eventsAndRiskEvents.filter(e => e.deleteLinks === 0),
                    state.logicalOperators.filter(l => l.deleteLinks === 0),
                    state.activities
                )
            }
        }
        case SET_IS_ACTIVE_FOR_ACTIVITY: {
            const activities = state.activities.map(activity => {
                if (activity.id === action.payload.id) {
                    return {
                        ...activity,
                        isActive: action.payload.isActive
                    }
                }
                return activity
            })
            const activity = activities.find(activity => activity.id === action.payload.id)

            let eventsAndRiskEvents = state.eventsAndRiskEvents
            let logicalOperators = state.logicalOperators

            if (activity.type === 'UPDATE_EVENT_OR_RISK_EVENT') {
                eventsAndRiskEvents = eventsAndRiskEvents.map(eventOrRiskEvent => {
                    if (eventOrRiskEvent.id === activity.eventOrRiskEventId) {
                        return {
                            ...eventOrRiskEvent,
                            probability: activity.isActive ? eventOrRiskEvent.probability + activity.probability : eventOrRiskEvent.probability - activity.probability,
                            consequences: activity.isActive ? eventOrRiskEvent.consequences + activity.consequences : eventOrRiskEvent.consequences - activity.consequences
                        }
                    }
                    return eventOrRiskEvent
                })
            }

            if (activity.type === 'DELETE_EVENT_OR_RISK_EVENT') {
                eventsAndRiskEvents = eventsAndRiskEvents.map(eventOrRiskEvent => {
                    if (eventOrRiskEvent.id === activity.eventOrRiskEventId) {
                        return {
                            ...eventOrRiskEvent,
                            deleteLinks: activity.isActive ? eventOrRiskEvent.deleteLinks + 1 : eventOrRiskEvent.deleteLinks - 1
                        }
                    }
                    return eventOrRiskEvent
                })

                logicalOperators = logicalOperators.map(logicalOperator => {
                    if (
                        logicalOperator.firstInputEventOrRiskEventId === activity.eventOrRiskEventId
                        || logicalOperator.secondInputEventOrRiskEventId === activity.eventOrRiskEventId
                        || logicalOperator.outputEventOrRiskEventId === activity.eventOrRiskEventId
                    ) {
                        return {
                            ...logicalOperator,
                            deleteLinks: activity.isActive ? logicalOperator.deleteLinks + 1 : logicalOperator.deleteLinks - 1
                        }
                    }
                    return logicalOperator
                })
            }

            if (activity.type === 'DELETE_LOGICAL_OPERATOR') {
                logicalOperators = logicalOperators.map(logicalOperator => {
                    if (logicalOperator.id === activity.logicalOperatorId) {
                        return {
                            ...logicalOperator,
                            deleteLinks: activity.isActive ? logicalOperator.deleteLinks + 1 : logicalOperator.deleteLinks - 1
                        }
                    }
                    return logicalOperator
                })
            }

            eventsAndRiskEvents = getEventsAndRiskEventsWithCurrentProbabilities(
                eventsAndRiskEvents,
                logicalOperators.filter(l => l.deleteLinks === 0)
            )

            return {
                ...state,
                eventsAndRiskEvents,
                logicalOperators,
                activities,
                ...calcAll(
                    eventsAndRiskEvents.filter(e => e.deleteLinks === 0),
                    logicalOperators.filter(l => l.deleteLinks === 0),
                    activities
                )
            }
        }
        default:
            return state
    }
}
