import composition from './composition'

export default function calcActiveSituationsAndRiskSituationsTags(fuzzyAutomatas, activeEventsAndRiskEventsTags) {
    const newActiveSituationsAndRiskSituationsTags = []

    for (let i = 0; i < fuzzyAutomatas.length; i++) {
        let q = composition(fuzzyAutomatas[i].s, fuzzyAutomatas[i].T['E'])

        for (const tag of activeEventsAndRiskEventsTags) {
            if (fuzzyAutomatas[i].T[tag]) {
                q = composition(q, fuzzyAutomatas[i].T[tag])
                q = composition(q, fuzzyAutomatas[i].T['E'])
            }
        }

        q = composition(q, fuzzyAutomatas[i].T['E'])

        const tempActiveSituationsAndRiskSituationsTags = []

        for (let j = 0; j < q.length; j++) {
            if (q[j] > 0.5) {
                tempActiveSituationsAndRiskSituationsTags.push(fuzzyAutomatas[i].Q[j])
            }
        }

        newActiveSituationsAndRiskSituationsTags.push(tempActiveSituationsAndRiskSituationsTags)
    }

    return newActiveSituationsAndRiskSituationsTags
}
