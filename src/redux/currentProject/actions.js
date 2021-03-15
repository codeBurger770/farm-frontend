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

export const setEventsAndRiskEventsAndLogicalOperatorsAndActivitiesAction = (eventsAndRiskEvents, logicalOperators, activities) => ({
    type: SET_EVENTS_AND_RISK_EVENTS_AND_LOGICAL_OPERATORS_AND_ACTIVITIES,
    payload: {
        eventsAndRiskEvents,
        logicalOperators,
        activities
    }
})

export const createEventOrRiskEventAction = (id, tag, type, description, probability, consequences) => ({
    type: CREATE_EVENT_OR_RISK_EVENT,
    payload: {
        id,
        tag,
        type,
        description,
        probability,
        consequences
    }
})

export const updateEventOrRiskEventAction = (id, tag, type, description, probability, consequences) => ({
    type: UPDATE_EVENT_OR_RISK_EVENT,
    payload: {
        id,
        tag,
        type,
        description,
        probability,
        consequences
    }
})

export const deleteEventOrRiskEventAction = id => ({
    type: DELETE_EVENT_OR_RISK_EVENT,
    payload: {
        id
    }
})

export const createLogicalOperatorAction = (id, tag, type, firstInputEventOrRiskEventId, secondInputEventOrRiskEventId, outputEventOrRiskEventId) => ({
    type: CREATE_LOGICAL_OPERATOR,
    payload: {
        id,
        tag,
        type,
        firstInputEventOrRiskEventId,
        secondInputEventOrRiskEventId,
        outputEventOrRiskEventId
    }
})

export const updateLogicalOperatorAction = (id, tag, type, firstInputEventOrRiskEventId, secondInputEventOrRiskEventId, outputEventOrRiskEventId) => ({
    type: UPDATE_LOGICAL_OPERATOR,
    payload: {
        id,
        tag,
        type,
        firstInputEventOrRiskEventId,
        secondInputEventOrRiskEventId,
        outputEventOrRiskEventId
    }
})

export const deleteLogicalOperatorAction = id => ({
    type: DELETE_LOGICAL_OPERATOR,
    payload: {
        id
    }
})

export const createActivityAction = (id, tag, type, eventOrRiskEventId, logicalOperatorId, description, cost, probability, consequences) => ({
    type: CREATE_ACTIVITY,
    payload: {
        id,
        tag,
        type,
        eventOrRiskEventId,
        logicalOperatorId,
        description,
        cost,
        probability,
        consequences
    }
})

export const updateActivityAction = (id, tag, type, eventOrRiskEventId, logicalOperatorId, description, cost, probability, consequences) => ({
    type: UPDATE_ACTIVITY,
    payload: {
        id,
        tag,
        type,
        eventOrRiskEventId,
        logicalOperatorId,
        description,
        cost,
        probability,
        consequences
    }
})

export const deleteActivityAction = id => ({
    type: DELETE_ACTIVITY,
    payload: {
        id
    }
})
