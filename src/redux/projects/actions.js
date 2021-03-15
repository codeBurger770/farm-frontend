import {
    SET_PROJECTS,
    CREATE_PROJECT,
    UPDATE_PROJECT,
    DELETE_PROJECT
} from './types'

export const setProjectsAction = projects => ({
    type: SET_PROJECTS,
    payload: {
        projects
    }
})

export const createProjectAction = (id, name, description) => ({
    type: CREATE_PROJECT,
    payload: {
        id,
        name,
        description
    }
})

export const updateProjectAction = (id, name, description) => ({
    type: UPDATE_PROJECT,
    payload: {
        id,
        name,
        description
    }
})

export const deleteProjectAction = id => ({
    type: DELETE_PROJECT,
    payload: {
        id
    }
})
