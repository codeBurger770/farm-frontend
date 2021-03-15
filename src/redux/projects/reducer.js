import {
    SET_PROJECTS,
    CREATE_PROJECT,
    UPDATE_PROJECT,
    DELETE_PROJECT
} from './types'

const initialState = []

export default function projectsReducer(state = initialState, action) {
    switch (action.type) {
        case SET_PROJECTS:
            return [
                ...action.payload.projects
            ]
        case CREATE_PROJECT:
            return [
                ...state,
                {
                    ...action.payload
                }
            ]
        case UPDATE_PROJECT:
            return state.map(project => {
                if (project.id === action.payload.id) {
                    return {
                        ...action.payload
                    }
                }
                return project
            })
        case DELETE_PROJECT:
            return state.filter(project => project.id !== action.payload.id)
        default:
            return state
    }
}
