import {
    setEventsAndRiskEventsAndLogicalOperatorsAndActivitiesAction,
    createEventOrRiskEventAction,
    updateEventOrRiskEventAction,
    deleteEventOrRiskEventAction,
    createLogicalOperatorAction,
    updateLogicalOperatorAction,
    deleteLogicalOperatorAction,
    createActivityAction,
    updateActivityAction,
    deleteActivityAction
} from './actions'

import {
    setIsLoadingAction,
    setIsFinishAction
} from '../forms/actions'

import {
    createEventOrRiskEventService,
    readAllEventsAndRiskEventsService,
    updateEventOrRiskEventService,
    deleteEventOrRiskEventService,
    createLogicalOperatorService,
    readAllLogicalOperatorsService,
    updateLogicalOperatorService,
    deleteLogicalOperatorService,
    createActivityService,
    readAllActivitiesService,
    updateActivityService,
    deleteActivityService
} from '../../services/currentProject'

export const setEventsAndRiskEventsAndLogicalOperatorsAndActivitiesThunk = projectId => async (dispatch, getState) => {
    const { accessToken } = getState().auth
    const result1 = await readAllEventsAndRiskEventsService(accessToken, projectId)
    const result2 = await readAllLogicalOperatorsService(accessToken, projectId)
    const result3 = await readAllActivitiesService(accessToken, projectId)

    if (result1.success && result2.success && result3.success) {
        dispatch(setEventsAndRiskEventsAndLogicalOperatorsAndActivitiesAction(result1.success, result2.success, result3.success))
    }
}

export const createEventOrRiskEventThunk = projectId => async (dispatch, getState) => {
    dispatch(setIsLoadingAction(true))

    const { auth, forms } = getState()
    const { accessToken } = auth
    const { type, description, probability, consequences } = forms
    const result = await createEventOrRiskEventService(accessToken, projectId, type, description, probability, consequences)

    dispatch(setIsLoadingAction(false))

    if (result.success) {
        const { id, tag, type, description, probability, consequences } = result.success

        dispatch(createEventOrRiskEventAction(id, tag, type, description, probability, consequences))
        dispatch(setIsFinishAction(true))
    }
}

export const updateEventOrRiskEventThunk = (projectId, eventOrRiskEventId) => async (dispatch, getState) => {
    dispatch(setIsLoadingAction(true))

    const { auth, forms } = getState()
    const { accessToken } = auth
    const { type, description, probability, consequences } = forms
    const result = await updateEventOrRiskEventService(accessToken, projectId, eventOrRiskEventId, type, description, probability, consequences)

    dispatch(setIsLoadingAction(false))

    if (result.success) {
        const { id, tag, type, description, probability, consequences } = result.success

        dispatch(updateEventOrRiskEventAction(id, tag, type, description, probability, consequences))
        dispatch(setIsFinishAction(true))
    }
}

export const deleteEventOrRiskEventThunk = (projectId, eventOrRiskEventId) => async (dispatch, getState) => {
    const { accessToken } = getState().auth
    const result = await deleteEventOrRiskEventService(accessToken, projectId, eventOrRiskEventId)

    if (result.success) {
        dispatch(deleteEventOrRiskEventAction(result.success.id))
    }
}

export const createLogicalOperatorThunk = projectId => async (dispatch, getState) => {
    dispatch(setIsLoadingAction(true))

    const { auth, forms } = getState()
    const { accessToken } = auth
    const { type, firstInputEventOrRiskEventId, secondInputEventOrRiskEventId, outputEventOrRiskEventId } = forms
    const result = await createLogicalOperatorService(accessToken, projectId, type, firstInputEventOrRiskEventId, secondInputEventOrRiskEventId, outputEventOrRiskEventId)

    dispatch(setIsLoadingAction(false))

    if (result.success) {
        const { id, tag, type, firstInputEventOrRiskEventId, secondInputEventOrRiskEventId, outputEventOrRiskEventId } = result.success

        dispatch(createLogicalOperatorAction(id, tag, type, firstInputEventOrRiskEventId, secondInputEventOrRiskEventId, outputEventOrRiskEventId))
        dispatch(setIsFinishAction(true))
    }
}

export const updateLogicalOperatorThunk = (projectId, logicalOperatorId) => async (dispatch, getState) => {
    dispatch(setIsLoadingAction(true))

    const { auth, forms } = getState()
    const { accessToken } = auth
    const { type, firstInputEventOrRiskEventId, secondInputEventOrRiskEventId, outputEventOrRiskEventId } = forms
    const result = await updateLogicalOperatorService(accessToken, projectId, logicalOperatorId, type, firstInputEventOrRiskEventId, secondInputEventOrRiskEventId, outputEventOrRiskEventId)

    dispatch(setIsLoadingAction(false))

    if (result.success) {
        const { id, tag, type, firstInputEventOrRiskEventId, secondInputEventOrRiskEventId, outputEventOrRiskEventId } = result.success

        dispatch(updateLogicalOperatorAction(id, tag, type, firstInputEventOrRiskEventId, secondInputEventOrRiskEventId, outputEventOrRiskEventId))
        dispatch(setIsFinishAction(true))
    }
}

export const deleteLogicalOperatorThunk = (projectId, logicalOperatorId) => async (dispatch, getState) => {
    const { accessToken } = getState().auth
    const result = await deleteLogicalOperatorService(accessToken, projectId, logicalOperatorId)

    if (result.success) {
        dispatch(deleteLogicalOperatorAction(result.success.id))
    }
}

export const createActivityThunk = projectId => async (dispatch, getState) => {
    dispatch(setIsLoadingAction(true))

    const { auth, forms } = getState()
    const { accessToken } = auth
    const { type, eventOrRiskEventOrLogicalOperatorId, description, cost, probability, consequences } = forms
    const result = await createActivityService(accessToken, projectId, type, eventOrRiskEventOrLogicalOperatorId, description, cost, probability, consequences)

    dispatch(setIsLoadingAction(false))

    if (result.success) {
        const { id, tag, type, eventOrRiskEventId, logicalOperatorId, description, cost, probability, consequences } = result.success

        dispatch(createActivityAction(id, tag, type, eventOrRiskEventId, logicalOperatorId, description, cost, probability, consequences))
        dispatch(setIsFinishAction(true))
    }
}

export const updateActivityThunk = (projectId, activityId) => async (dispatch, getState) => {
    dispatch(setIsLoadingAction(true))

    const { auth, forms } = getState()
    const { accessToken } = auth
    const { type, eventOrRiskEventOrLogicalOperatorId, description, cost, probability, consequences } = forms
    const result = await updateActivityService(accessToken, projectId, activityId, type, eventOrRiskEventOrLogicalOperatorId, description, cost, probability, consequences)

    dispatch(setIsLoadingAction(false))

    if (result.success) {
        const { id, tag, type, eventOrRiskEventId, logicalOperatorId, description, cost, probability, consequences } = result.success

        dispatch(updateActivityAction(id, tag, type, eventOrRiskEventId, logicalOperatorId, description, cost, probability, consequences))
        dispatch(setIsFinishAction(true))
    }
}

export const deleteActivityThunk = (projectId, activityId) => async (dispatch, getState) => {
    dispatch(setIsLoadingAction(true))

    const { accessToken } = getState().auth
    const result = await deleteActivityService(accessToken, projectId, activityId)

    dispatch(setIsLoadingAction(false))

    if (result.success) {
        dispatch(deleteActivityAction(result.success.id))
    }
}
