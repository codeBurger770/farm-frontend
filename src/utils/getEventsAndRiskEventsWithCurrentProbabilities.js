export default function getEventsAndRiskEventsWithCurrentProbabilities(eventsAndRiskEvents, logicalOperators) {
    const newEventsAndRiskEvents = []

    for (const eventOrRiskEvent of eventsAndRiskEvents) {
        const allPrevLogicalOperators = []
        const allProbabilities = {}

        f(eventOrRiskEvent, allPrevLogicalOperators, eventsAndRiskEvents, logicalOperators)

        if (allPrevLogicalOperators.length) {
            for (const logicalOperator of allPrevLogicalOperators) {
                const firstInputEventOrRiskEvent = eventsAndRiskEvents.find(eventOrRiskEvent => eventOrRiskEvent.id === logicalOperator.firstInputEventOrRiskEventId)
                const secondInputEventOrRiskEvent = eventsAndRiskEvents.find(eventOrRiskEvent => eventOrRiskEvent.id === logicalOperator.secondInputEventOrRiskEventId)
                const outputEventOrRiskEvent = eventsAndRiskEvents.find(eventOrRiskEvent => eventOrRiskEvent.id === logicalOperator.outputEventOrRiskEventId)

                if (!allProbabilities[firstInputEventOrRiskEvent.tag]) {
                    allProbabilities[firstInputEventOrRiskEvent.tag] = firstInputEventOrRiskEvent.probability
                }

                if (!allProbabilities[secondInputEventOrRiskEvent.tag]) {
                    allProbabilities[secondInputEventOrRiskEvent.tag] = secondInputEventOrRiskEvent.probability
                }

                const outputProbability = logicalOperator.type === 'AND'
                    ? Math.min(allProbabilities[firstInputEventOrRiskEvent.tag], allProbabilities[secondInputEventOrRiskEvent.tag])
                    : Math.max(allProbabilities[firstInputEventOrRiskEvent.tag], allProbabilities[secondInputEventOrRiskEvent.tag])

                if (!allProbabilities[outputEventOrRiskEvent.tag]) {
                    allProbabilities[outputEventOrRiskEvent.tag] = outputProbability
                } else {
                    allProbabilities[outputEventOrRiskEvent.tag] = Math.max(allProbabilities[outputEventOrRiskEvent.tag], outputProbability)
                }
            }

            newEventsAndRiskEvents.push({
                ...eventOrRiskEvent,
                currentProbability: allProbabilities[eventOrRiskEvent.tag]
            })
        } else {
            newEventsAndRiskEvents.push({
                ...eventOrRiskEvent,
                currentProbability: eventOrRiskEvent.probability
            })
        }
    }

    return newEventsAndRiskEvents
}

function f(eventOrRiskEvent, allPrevLogicalOperators, eventsAndRiskEvents, logicalOperators) {
    const prevLogicalOperators = logicalOperators.filter(logicalOperator => logicalOperator.outputEventOrRiskEventId === eventOrRiskEvent.id)

    for (const logicalOperator of prevLogicalOperators) {
        allPrevLogicalOperators.unshift(logicalOperator)

        const firstInputEventOrRiskEvent = eventsAndRiskEvents.find(eventOrRiskEvent => eventOrRiskEvent.id === logicalOperator.firstInputEventOrRiskEventId)
        const secondInputEventOrRiskEvent = eventsAndRiskEvents.find(eventOrRiskEvent => eventOrRiskEvent.id === logicalOperator.secondInputEventOrRiskEventId)

        f(firstInputEventOrRiskEvent, allPrevLogicalOperators, eventsAndRiskEvents, logicalOperators)
        f(secondInputEventOrRiskEvent, allPrevLogicalOperators, eventsAndRiskEvents, logicalOperators)
    }
}
