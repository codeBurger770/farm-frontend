import {
    setProjectsAction,
    createProjectAction,
    updateProjectAction,
    deleteProjectAction
} from './actions'

import {
    setIsLoadingAction,
    setIsFinishAction
} from '../forms/actions'

import {
    createProjectService,
    readAllProjectsService,
    updateProjectService,
    deleteProjectService
} from '../../services/projects'

export const setProjectsThunk = () => async (dispatch, getState) => {
    const { accessToken } = getState().auth
    const result = await readAllProjectsService(accessToken)

    if (result.success) {
        dispatch(setProjectsAction(result.success))
    }
}

export const createProjectThunk = () => async (dispatch, getState) => {
    dispatch(setIsLoadingAction(true))

    const { auth, forms } = getState()
    const { accessToken } = auth
    const { name, description } = forms
    const result = await createProjectService(accessToken, name, description)

    dispatch(setIsLoadingAction(false))

    if (result.success) {
        const { id, name, description } = result.success

        dispatch(createProjectAction(id, name, description))
        dispatch(setIsFinishAction(true))
    }
}

export const updateProjectThunk = projectId => async (dispatch, getState) => {
    dispatch(setIsLoadingAction(true))

    const { auth, forms } = getState()
    const { accessToken } = auth
    const { name, description } = forms
    const result = await updateProjectService(accessToken, projectId, name, description)

    dispatch(setIsLoadingAction(false))

    if (result.success) {
        const { id, name, description } = result.success

        dispatch(updateProjectAction(id, name, description))
        dispatch(setIsFinishAction(true))
    }
}

export const deleteProjectThunk = projectId => async (dispatch, getState) => {
    const { accessToken } = getState().auth
    const result = await deleteProjectService(accessToken, projectId)

    if (result.success) {
        dispatch(deleteProjectAction(result.success.id))
    }
}
