export default function createFuzzyAutomatas(eventsAndRiskEvents, logicalOperators) {
    const fuzzyAutomatas = []

    const startEventsAndRiskEvents = eventsAndRiskEvents.filter(eventOrRiskEvent => {
        return !logicalOperators.find(({ outputEventOrRiskEventId }) => outputEventOrRiskEventId === eventOrRiskEvent.id)
    })

    for (const startEventOrRiskEvent of startEventsAndRiskEvents) {
        fuzzyAutomatas.push(
            createFuzzyAutomataForStartEventOrRiskEvent(startEventOrRiskEvent)
        )
    }

    for (const logicalOperator of logicalOperators) {
        const {
            type,
            firstInputEventOrRiskEventId,
            secondInputEventOrRiskEventId,
            outputEventOrRiskEventId
        } = logicalOperator

        const firstInputEventOrRiskEvent = eventsAndRiskEvents.find(({ id }) => id === firstInputEventOrRiskEventId)
        const secondInputEventOrRiskEvent = eventsAndRiskEvents.find(({ id }) => id === secondInputEventOrRiskEventId)
        const outputEventOrRiskEvent = eventsAndRiskEvents.find(({ id }) => id === outputEventOrRiskEventId)

        if (type === 'AND') {
            fuzzyAutomatas.push(createFuzzyAutomataForLogicalOperatorAnd(
                firstInputEventOrRiskEvent,
                secondInputEventOrRiskEvent,
                outputEventOrRiskEvent
            ))
        } else {
            fuzzyAutomatas.push(createFuzzyAutomataForLogicalOperatorOr(
                firstInputEventOrRiskEvent,
                secondInputEventOrRiskEvent,
                outputEventOrRiskEvent
            ))
        }
    }

    return fuzzyAutomatas
}

function createFuzzyAutomataForStartEventOrRiskEvent({ tag, currentProbability }) {
    const Q = ['S0', tag.replace('RE', 'RS').replace('E', 'S')]

    const s = [1, 0]

    const T = {
        [tag]: [
            [1 - currentProbability, currentProbability],
            [0, 0]
        ],
        'E': [
            [1, 0],
            [0, 1]
        ]
    }

    const f = [0, 1]

    return {
        Q,
        s,
        T,
        f,
        eventOrRiskEventTagWillActivated: tag
    }
}

function createFuzzyAutomataForLogicalOperatorAnd(
    firstInputEventOrRiskEvent,
    secondInputEventOrRiskEvent,
    outputEventOrRiskEvent
) {
    const Q = [
        'S0',
        firstInputEventOrRiskEvent.tag.replace('RE', 'RS').replace('E', 'S'),
        secondInputEventOrRiskEvent.tag.replace('RE', 'RS').replace('E', 'S'),
        outputEventOrRiskEvent.tag.replace('RE', 'RS').replace('E', 'S')
    ]

    const s = [1, 0, 0, 0]

    const T = {
        [firstInputEventOrRiskEvent.tag]: [
            [1 - firstInputEventOrRiskEvent.currentProbability, firstInputEventOrRiskEvent.currentProbability, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 1 - firstInputEventOrRiskEvent.currentProbability, firstInputEventOrRiskEvent.currentProbability],
            [0, 0, 0, 0]
        ],
        [secondInputEventOrRiskEvent.tag]: [
            [1 - secondInputEventOrRiskEvent.currentProbability, 0, secondInputEventOrRiskEvent.currentProbability, 0],
            [0, 1 - secondInputEventOrRiskEvent.currentProbability, 0, secondInputEventOrRiskEvent.currentProbability],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        'E': [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ]
    }

    const f = [0, 0, 0, 1]

    return {
        Q,
        s,
        T,
        f,
        eventOrRiskEventTagWillActivated: outputEventOrRiskEvent.tag
    }
}

function createFuzzyAutomataForLogicalOperatorOr(
    firstInputEventOrRiskEvent,
    secondInputEventOrRiskEvent,
    outputEventOrRiskEvent
) {
    const Q = [
        'S0',
        firstInputEventOrRiskEvent.tag.replace('RE', 'RS').replace('E', 'S'),
        secondInputEventOrRiskEvent.tag.replace('RE', 'RS').replace('E', 'S'),
        outputEventOrRiskEvent.tag.replace('RE', 'RS').replace('E', 'S') + '_A',
        outputEventOrRiskEvent.tag.replace('RE', 'RS').replace('E', 'S') + '_B',
        outputEventOrRiskEvent.tag.replace('RE', 'RS').replace('E', 'S') + '_C'
    ]

    const s = [1, 0, 0, 0, 0, 0]

    const T = {
        [firstInputEventOrRiskEvent.tag]: [
            [1 - firstInputEventOrRiskEvent.currentProbability, firstInputEventOrRiskEvent.currentProbability, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1 - firstInputEventOrRiskEvent.currentProbability, firstInputEventOrRiskEvent.currentProbability],
            [0, 0, 0, 0, 0, 0]
        ],
        [secondInputEventOrRiskEvent.tag]: [
            [1 - secondInputEventOrRiskEvent.currentProbability, 0, secondInputEventOrRiskEvent.currentProbability, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1 - secondInputEventOrRiskEvent.currentProbability, 0, secondInputEventOrRiskEvent.currentProbability],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0]
        ],
        'E': [
            [1, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0],
            [0, 0, 0, 0, 1, 0],
            [0, 0, 0, 1, 0, 0],
            [0, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 0, 1]
        ]
    }

    const f = [0, 0, 0, 1, 1, 1]

    return {
        Q,
        s,
        T,
        f,
        eventOrRiskEventTagWillActivated: outputEventOrRiskEvent.tag
    }
}
