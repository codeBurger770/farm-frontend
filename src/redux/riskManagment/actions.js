import {
    SET_EVENTS_AND_RISK_EVENTS_AND_LOGICAL_OPERATORS_AND_ACTIVITIES,
    SET_IS_ACTIVE_FOR_EVENT_OR_RISK_EVENT,
    SET_IS_ACTIVE_FOR_ACTIVITY
} from './types'

export const setEventsAndRiskEventsAndLogicalOperatorsAndActivitiesAction = (eventsAndRiskEvents, logicalOperators, activities) => ({
    type: SET_EVENTS_AND_RISK_EVENTS_AND_LOGICAL_OPERATORS_AND_ACTIVITIES,
    payload: {
        eventsAndRiskEvents,
        logicalOperators,
        activities
    }
})

export const setIsActiveForEventOrRiskEvent = (id, isActive) => ({
    type: SET_IS_ACTIVE_FOR_EVENT_OR_RISK_EVENT,
    payload: {
        id,
        isActive
    }
})

export const setIsActiveForActivity = (id, isActive) => ({
    type: SET_IS_ACTIVE_FOR_ACTIVITY,
    payload: {
        id,
        isActive
    }
})
