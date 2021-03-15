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

const initialState = {
    email: '',
    password: '',
    confirmationCode: '',
    name: '',
    description: '',
    type: '',
    probability: '',
    consequences: '',
    cost: '',
    firstInputEventOrRiskEventId: '',
    secondInputEventOrRiskEventId: '',
    outputEventOrRiskEventId: '',
    eventOrRiskEventOrLogicalOperatorId: '',
    isLoading: false,
    isAwaitingConfirmationCode: false,
    isFinish: false,
    emailFeedback: '',
    passwordFeedback: '',
    confirmationCodeFeedback: ''
}

export default function formsReducer(state = initialState, action) {
    switch (action.type) {
        case RESET:
            return initialState
        case SET_EMAIL:
            return {
                ...state,
                email: action.payload.email
            }
        case SET_PASSWORD:
            return {
                ...state,
                password: action.payload.password
            }
        case SET_CONFIRMATION_CODE:
            return {
                ...state,
                confirmationCode: action.payload.confirmationCode
            }
        case SET_NAME:
            return {
                ...state,
                name: action.payload.name
            }
        case SET_DESCRIPTION:
            return {
                ...state,
                description: action.payload.description
            }
        case SET_TYPE:
            return {
                ...state,
                type: action.payload.type
            }
        case SET_PROBABILITY:
            return {
                ...state,
                probability: action.payload.probability
            }
        case SET_CONSEQUENCES:
            return {
                ...state,
                consequences: action.payload.consequences
            }
        case SET_COST:
            return {
                ...state,
                cost: action.payload.cost
            }
        case SET_FIRST_INPUT_EVENT_OR_RISK_EVENT_ID:
            return {
                ...state,
                firstInputEventOrRiskEventId: action.payload.firstInputEventOrRiskEventId
            }
        case SET_SECOND_INPUT_EVENT_OR_RISK_EVENT_ID:
            return {
                ...state,
                secondInputEventOrRiskEventId: action.payload.secondInputEventOrRiskEventId
            }
        case SET_OUTPUT_EVENT_OR_RISK_EVENT_ID:
            return {
                ...state,
                outputEventOrRiskEventId: action.payload.outputEventOrRiskEventId
            }
        case SET_EVENT_OR_RISK_EVENT_OR_LOGICAL_OPERATOR_ID:
            return {
                ...state,
                eventOrRiskEventOrLogicalOperatorId: action.payload.eventOrRiskEventOrLogicalOperatorId
            }
        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.payload.isLoading
            }
        case SET_IS_AWAITING_CONFIRMATION_CODE:
            return {
                ...state,
                isAwaitingConfirmationCode: action.payload.isAwaitingConfirmationCode
            }
        case SET_IS_FINISH:
            return {
                ...state,
                isFinish: action.payload.isFinish
            }
        case SET_EMAIL_FEEDBACK:
            return {
                ...state,
                emailFeedback: action.payload.emailFeedback
            }
        case SET_PASSWORD_FEEDBACK:
            return {
                ...state,
                passwordFeedback: action.payload.passwordFeedback
            }
        case SET_CONFIRMATION_CODE_FEEDBACK:
            return {
                ...state,
                confirmationCodeFeedback: action.payload.confirmationCodeFeedback
            }
        default:
            return state
    }
}
