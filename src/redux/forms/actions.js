import {
    RESET,
    SET_EMAIL,
    SET_PASSWORD,
    SET_CONFIRMATION_CODE,
    SET_NAME,
    SET_DESCRIPTION,
    SET_TYPE,
    SET_PROBABILITY,
    SET_CONSEQUENCES,
    SET_COST,
    SET_FIRST_INPUT_EVENT_OR_RISK_EVENT_ID,
    SET_SECOND_INPUT_EVENT_OR_RISK_EVENT_ID,
    SET_OUTPUT_EVENT_OR_RISK_EVENT_ID,
    SET_EVENT_OR_RISK_EVENT_OR_LOGICAL_OPERATOR_ID,
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

export const setNameAction = name => ({
    type: SET_NAME,
    payload: {
        name
    }
})

export const setDescriptionAction = description => ({
    type: SET_DESCRIPTION,
    payload: {
        description
    }
})

export const setTypeAction = type => ({
    type: SET_TYPE,
    payload: {
        type
    }
})

export const setProbabilityAction = probability => ({
    type: SET_PROBABILITY,
    payload: {
        probability
    }
})

export const setConsequencesAction = consequences => ({
    type: SET_CONSEQUENCES,
    payload: {
        consequences
    }
})

export const setCostAction = cost => ({
    type: SET_COST,
    payload: {
        cost
    }
})

export const setFirstInputEventOrRiskEventIdAction = firstInputEventOrRiskEventId => ({
    type: SET_FIRST_INPUT_EVENT_OR_RISK_EVENT_ID,
    payload: {
        firstInputEventOrRiskEventId
    }
})

export const setSecondInputEventOrRiskEventIdAction = secondInputEventOrRiskEventId => ({
    type: SET_SECOND_INPUT_EVENT_OR_RISK_EVENT_ID,
    payload: {
        secondInputEventOrRiskEventId
    }
})

export const setOutputEventOrRiskEventIdAction = outputEventOrRiskEventId => ({
    type: SET_OUTPUT_EVENT_OR_RISK_EVENT_ID,
    payload: {
        outputEventOrRiskEventId
    }
})

export const setEventOrRiskEventOrLogicalOperatorIdAction = eventOrRiskEventOrLogicalOperatorId => ({
    type: SET_EVENT_OR_RISK_EVENT_OR_LOGICAL_OPERATOR_ID,
    payload: {
        eventOrRiskEventOrLogicalOperatorId
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
