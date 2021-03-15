import createFuzzyAutomatas from './createFuzzyAutomatas'
import createDotStructure from './createDotStructure'
import createDotSystem from './createDotSystem'
import calcActiveEventsAndRiskEventsTags from './calcActiveEventsAndRiskEventsTags'
import calcActiveSituationsAndRiskSituationsTags from './calcActiveSituationsAndRiskSituationsTags'

export default function calcAll(eventsAndRiskEvents, logicalOperators, activities) {
    const fuzzyAutomatas = createFuzzyAutomatas(eventsAndRiskEvents, logicalOperators)
    const activeEventsAndRiskEventsTags = calcActiveEventsAndRiskEventsTags(
        fuzzyAutomatas,
        eventsAndRiskEvents.filter(e => e.isActive).map(e => e.tag)
    )
    const totalCosts = activities.reduce((totalCosts, activity) => {
        if (activity.isActive) {
            return totalCosts + activity.cost
        }
        return totalCosts + 0
    }, 0)
    const totalConsequences = activeEventsAndRiskEventsTags.reduce((totalConsequences, tag) => {
        const eventOrRiskEvent = eventsAndRiskEvents.find(e => e.tag === tag)
        return totalConsequences + eventOrRiskEvent.consequences
    }, 0)
    const activeSituationsAndRiskSituationsTags = calcActiveSituationsAndRiskSituationsTags(fuzzyAutomatas, activeEventsAndRiskEventsTags)
    const dotStructure = createDotStructure(eventsAndRiskEvents, logicalOperators, activeEventsAndRiskEventsTags)
    const dotSystem = createDotSystem(fuzzyAutomatas, activeSituationsAndRiskSituationsTags)

    return {
        totalCosts,
        totalConsequences,
        dotStructure,
        dotSystem
    }
}
