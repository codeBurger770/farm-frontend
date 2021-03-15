export const createEventOrRiskEventService = async (accessToken, projectId, type, description, probability, consequences) => {
    const response = await fetch(`http://localhost:3001/api/projects/${projectId}/events-and-risk-events`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({
            type,
            description,
            probability,
            consequences
        })
    })

    return await response.json()
}

export const readAllEventsAndRiskEventsService = async (accessToken, projectId) => {
    const response = await fetch(`http://localhost:3001/api/projects/${projectId}/events-and-risk-events`, {
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: `Bearer ${accessToken}`
        }
    })

    return await response.json()
}

export const updateEventOrRiskEventService = async (accessToken, projectId, eventOrRiskEventId, type, description, probability, consequences) => {
    const response = await fetch(`http://localhost:3001/api/projects/${projectId}/events-and-risk-events/${eventOrRiskEventId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({
            type,
            description,
            probability,
            consequences
        })
    })

    return await response.json()
}

export const deleteEventOrRiskEventService = async (accessToken, projectId, eventOrRiskEventId) => {
    const response = await fetch(`http://localhost:3001/api/projects/${projectId}/events-and-risk-events/${eventOrRiskEventId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: `Bearer ${accessToken}`
        }
    })

    return await response.json()
}

export const createLogicalOperatorService = async (accessToken, projectId, type, firstInputEventOrRiskEventId, secondInputEventOrRiskEventId, outputEventOrRiskEventId) => {
    const response = await fetch(`http://localhost:3001/api/projects/${projectId}/logical-operators`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({
            type,
            firstInputEventOrRiskEventId,
            secondInputEventOrRiskEventId,
            outputEventOrRiskEventId
        })
    })

    return await response.json()
}

export const readAllLogicalOperatorsService = async (accessToken, projectId) => {
    const response = await fetch(`http://localhost:3001/api/projects/${projectId}/logical-operators`, {
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: `Bearer ${accessToken}`
        }
    })

    return await response.json()
}

export const updateLogicalOperatorService = async (accessToken, projectId, logicalOperatorId, type, firstInputEventOrRiskEventId, secondInputEventOrRiskEventId, outputEventOrRiskEventId) => {
    const response = await fetch(`http://localhost:3001/api/projects/${projectId}/logical-operators/${logicalOperatorId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({
            type,
            firstInputEventOrRiskEventId,
            secondInputEventOrRiskEventId,
            outputEventOrRiskEventId
        })
    })

    return await response.json()
}

export const deleteLogicalOperatorService = async (accessToken, projectId, logicalOperatorId) => {
    const response = await fetch(`http://localhost:3001/api/projects/${projectId}/logical-operators/${logicalOperatorId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: `Bearer ${accessToken}`
        }
    })

    return await response.json()
}

export const createActivityService = async (accessToken, projectId, type, eventOrRiskEventOrLogicalOperatorId, description, cost, probability, consequences) => {
    const response = await fetch(`http://localhost:3001/api/projects/${projectId}/activities`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({
            type,
            eventOrRiskEventOrLogicalOperatorId,
            description,
            cost,
            probability,
            consequences
        })
    })

    return await response.json()
}

export const readAllActivitiesService = async (accessToken, projectId) => {
    const response = await fetch(`http://localhost:3001/api/projects/${projectId}/activities`, {
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: `Bearer ${accessToken}`
        }
    })

    return await response.json()
}

export const updateActivityService = async (accessToken, projectId, activityId, type, eventOrRiskEventOrLogicalOperatorId, description, cost, probability, consequences) => {
    const response = await fetch(`http://localhost:3001/api/projects/${projectId}/activities/${activityId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({
            type,
            eventOrRiskEventOrLogicalOperatorId,
            description,
            cost,
            probability,
            consequences
        })
    })

    return await response.json()
}

export const deleteActivityService = async (accessToken, projectId, activityId) => {
    const response = await fetch(`http://localhost:3001/api/projects/${projectId}/activities/${activityId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: `Bearer ${accessToken}`
        }
    })

    return await response.json()
}
