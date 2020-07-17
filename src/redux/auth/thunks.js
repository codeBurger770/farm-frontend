import {
    setAccessTokenAction,
    setRefreshTokenAction
} from './actions'

import {
    resetAction,
    setIsLoadingAction,
    setIsAwaitingConfirmationCodeAction,
    setIsFinishAction,
    setEmailFeedbackAction,
    setPasswordFeedbackAction,
    setConfirmationCodeFeedbackAction
} from '../forms/actions'

import {
    signUp1Service,
    signUp2Service,
    signInService,
    changePassword1Service,
    changePassword2Service
} from '../../services/auth'

export const signUp1Thunk = () => async (dispatch, getState) => {
    dispatch(setIsLoadingAction(true))
    dispatch(setEmailFeedbackAction(''))
    dispatch(setPasswordFeedbackAction(''))

    const { email, password } = getState().forms
    const result = await signUp1Service(email, password)

    if (result.error && result.error.emailFeedback) {
        dispatch(setEmailFeedbackAction(result.error.emailFeedback))
    }

    if (result.error && result.error.passwordFeedback) {
        dispatch(setPasswordFeedbackAction(result.error.passwordFeedback))
    }

    if (result.success) {
        dispatch(setIsAwaitingConfirmationCodeAction(true))
    }

    dispatch(setIsLoadingAction(false))
}

export const signUp2Thunk = () => async (dispatch, getState) => {
    dispatch(setIsLoadingAction(true))
    dispatch(setConfirmationCodeFeedbackAction(''))

    const { email, confirmationCode } = getState().forms
    const result = await signUp2Service(email, confirmationCode)

    if (result.error && result.error.confirmationCodeFeedback) {
        dispatch(setConfirmationCodeFeedbackAction(result.error.confirmationCodeFeedback))
    }

    if (result.error && !result.error.numberConfirmationAttempts) {
        dispatch(resetAction())
    }

    dispatch(setIsLoadingAction(false))

    if (result.success) {
        dispatch(setIsFinishAction(true))
    }
}

export const signInThunk = () => async (dispatch, getState) => {
    dispatch(setIsLoadingAction(true))
    dispatch(setEmailFeedbackAction(''))
    dispatch(setPasswordFeedbackAction(''))

    const { email, password } = getState().forms
    const result = await signInService(email, password)

    if (result.error && result.error.emailFeedback) {
        dispatch(setEmailFeedbackAction(result.error.emailFeedback))
    }

    if (result.error && result.error.passwordFeedback) {
        dispatch(setPasswordFeedbackAction(result.error.passwordFeedback))
    }

    dispatch(setIsLoadingAction(false))

    if (result.success) {
        dispatch(setAccessTokenAction(result.success.accessToken))
        dispatch(setRefreshTokenAction(result.success.refreshToken))
    }
}

export const changePassword1Thunk = () => async (dispatch, getState) => {
    dispatch(setIsLoadingAction(true))
    dispatch(setEmailFeedbackAction(''))

    const { email } = getState().forms
    const result = await changePassword1Service(email)

    if (result.error && result.error.emailFeedback) {
        dispatch(setEmailFeedbackAction(result.error.emailFeedback))
    }

    if (result.success) {
        dispatch(setIsAwaitingConfirmationCodeAction(true))
    }

    dispatch(setIsLoadingAction(false))
}

export const changePassword2Thunk = () => async (dispatch, getState) => {
    dispatch(setIsLoadingAction(true))
    dispatch(setPasswordFeedbackAction(''))
    dispatch(setConfirmationCodeFeedbackAction(''))

    const { email, password, confirmationCode } = getState().forms
    const result = await changePassword2Service(email, password, confirmationCode)

    if (result.error && result.error.passwordFeedback) {
        dispatch(setPasswordFeedbackAction(result.error.passwordFeedback))
    }

    if (result.error && result.error.confirmationCodeFeedback) {
        dispatch(setConfirmationCodeFeedbackAction(result.error.confirmationCodeFeedback))
    }

    if (result.error && !result.error.numberConfirmationAttempts) {
        dispatch(resetAction())
    }

    dispatch(setIsLoadingAction(false))

    if (result.success) {
        dispatch(setIsFinishAction(true))
    }
}
