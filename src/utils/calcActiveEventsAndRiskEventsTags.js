import composition from './composition'

export default function calcActiveEventsAndRiskEventsTags(fuzzyAutomatas, activeEventsAndRiskEventsTags) {
    const newActiveEventsAndRiskEventsTags = [...activeEventsAndRiskEventsTags]

    for (let i = 0; i < fuzzyAutomatas.length; i++) {
        let q = composition(fuzzyAutomatas[i].s, fuzzyAutomatas[i].T['E'])

        for (const tag of newActiveEventsAndRiskEventsTags) {
            if (fuzzyAutomatas[i].T[tag]) {
                q = composition(q, fuzzyAutomatas[i].T[tag])
                q = composition(q, fuzzyAutomatas[i].T['E'])
            }
        }

        q = composition(q, fuzzyAutomatas[i].T['E'])

        if (composition(q, fuzzyAutomatas[i].f) > 0.5) {
            if (!newActiveEventsAndRiskEventsTags.find(tag => tag === fuzzyAutomatas[i].eventOrRiskEventTagWillActivated)) {
                newActiveEventsAndRiskEventsTags.push(fuzzyAutomatas[i].eventOrRiskEventTagWillActivated)
            }
        }
    }

    return newActiveEventsAndRiskEventsTags
}
