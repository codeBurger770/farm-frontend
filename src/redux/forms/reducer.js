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

const initialState = {
    email: '',
    password: '',
    confirmationCode: '',
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
