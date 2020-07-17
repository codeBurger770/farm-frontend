import {
    RESET,
    SET_EMAIL,
    SET_PASSWORD,
    SET_CONFIRMATION_CODE,
    SET_IS_LOADING,
    SET_IS_AWAITING_CONFIRMATION_CODE,
    SET_IS_FINISH,
    SET_EMAIL_FEEDBACK,
    SET_PASSWORD_FEEDBACK,
    SET_CONFIRMATION_CODE_FEEDBACK
} from './types'

export const resetAction = () => ({
    type: RESET
})

export const setEmailAction = email => ({
    type: SET_EMAIL,
    payload: {
        email
    }
})

export const setPasswordAction = password => ({
    type: SET_PASSWORD,
    payload: {
        password
    }
})

export const setConfirmationCodeAction = confirmationCode => ({
    type: SET_CONFIRMATION_CODE,
    payload: {
        confirmationCode
    }
})

export const setIsLoadingAction = isLoading => ({
    type: SET_IS_LOADING,
    payload: {
        isLoading
    }
})

export const setIsAwaitingConfirmationCodeAction = isAwaitingConfirmationCode => ({
    type: SET_IS_AWAITING_CONFIRMATION_CODE,
    payload: {
        isAwaitingConfirmationCode
    }
})

export const setIsFinishAction = isFinish => ({
    type: SET_IS_FINISH,
    payload: {
        isFinish
    }
})

export const setEmailFeedbackAction = emailFeedback => ({
    type: SET_EMAIL_FEEDBACK,
    payload: {
        emailFeedback
    }
})

export const setPasswordFeedbackAction = passwordFeedback => ({
    type: SET_PASSWORD_FEEDBACK,
    payload: {
        passwordFeedback
    }
})

export const setConfirmationCodeFeedbackAction = confirmationCodeFeedback => ({
    type: SET_CONFIRMATION_CODE_FEEDBACK,
    payload: {
        confirmationCodeFeedback
    }
})
