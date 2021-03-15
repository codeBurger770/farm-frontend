export const createProjectService = async (accessToken, name, description) => {
    const response = await fetch('http://localhost:3001/api/projects', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({
            name,
            description
        })
    })

    return await response.json()
}

export const readAllProjectsService = async accessToken => {
    const response = await fetch('http://localhost:3001/api/projects', {
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: `Bearer ${accessToken}`
        }
    })

    return await response.json()
}

export const updateProjectService = async (accessToken, projectId, name, description) => {
    const response = await fetch(`http://localhost:3001/api/projects/${projectId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({
            name,
            description
        })
    })

    return await response.json()
}

export const deleteProjectService = async (accessToken, projectId) => {
    const response = await fetch(`http://localhost:3001/api/projects/${projectId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: `Bearer ${accessToken}`
        }
    })

    return await response.json()
}
