export default function createDotStructure(eventsAndRiskEvents, logicalOperators, activeEventsAndRiskEventsTags) {
    let tempDot = eventsAndRiskEvents.reduce((previousDot, eventOrRiskEvent) => {
        for (const tag of activeEventsAndRiskEventsTags) {
            if (eventOrRiskEvent.tag === tag) {
                return previousDot += `\n\t${eventOrRiskEvent.tag} [label="${eventOrRiskEvent.tag}\n${eventOrRiskEvent.currentProbability.toFixed(3).replace(/0*$/, '').replace(/\.$/, '')}" shape="circle", style="filled", fillcolor="#28a745"];`
            }
        }

        return previousDot += `\n\t${eventOrRiskEvent.tag} [label="${eventOrRiskEvent.tag}\n${eventOrRiskEvent.currentProbability.toFixed(3).replace(/0*$/, '').replace(/\.$/, '')}" shape="circle"];`
    }, '')

    tempDot += logicalOperators.reduce((previousDot, logicalOperator) => {
        const {
            tag,
            firstInputEventOrRiskEventId,
            secondInputEventOrRiskEventId,
            outputEventOrRiskEventId
        } = logicalOperator

        const { tag: firstInputEventOrRiskEventTag } = eventsAndRiskEvents.find(({ id }) => id === firstInputEventOrRiskEventId)
        const { tag: secondInputEventOrRiskEventTag } = eventsAndRiskEvents.find(({ id }) => id === secondInputEventOrRiskEventId)
        const { tag: outputEventOrRiskEventTag } = eventsAndRiskEvents.find(({ id }) => id === outputEventOrRiskEventId)

        return previousDot + `
            ${tag} [shape="square"];
            ${firstInputEventOrRiskEventTag} -> ${tag};
            ${secondInputEventOrRiskEventTag} -> ${tag};
            ${tag} -> ${outputEventOrRiskEventTag};
        `
    }, '')

    console.log(`digraph {\n\tgraph [rankdir="BT"];\n\t${tempDot}}`)

    return `digraph {\n\tgraph [rankdir="BT"];\n\t${tempDot}}`
}
