export default function createDotSystem(fuzzyAutomatas, activeSituationsAndRiskSituationsTags) {
    const tempDot = fuzzyAutomatas.reduce((previousDot, fuzzyAutomata, index) => {
        for (let i = 0; i < fuzzyAutomata.Q.length; i++) {
            const vertex = fuzzyAutomata.Q[i] + index
            const label = fuzzyAutomata.Q[i]
            const shape = fuzzyAutomata.f[i] ? 'doublecircle' : 'circle'

            previousDot += `\n\t${vertex} [label="${label}", shape="${shape}"];`

            if (activeSituationsAndRiskSituationsTags.length) {
                for (let j = 0; j < activeSituationsAndRiskSituationsTags[index].length; j++) {
                    if (fuzzyAutomata.Q[i] === activeSituationsAndRiskSituationsTags[index][j]) {
                        previousDot += `\n\t${vertex} [style="filled", fillcolor="#28a745"];`
                    }
                }
            }

            if (fuzzyAutomata.s[i]) {
                const startVertex = `_${vertex}`
                previousDot += `\n\t${startVertex} [style="invis"];\n\t${startVertex} -> ${vertex};`
            }

            if (fuzzyAutomata.f[i]) {
                const finishVertex = `${vertex}_`
                const labelFinishVertex = fuzzyAutomata.eventOrRiskEventTagWillActivated
                previousDot += `\n\t${finishVertex} [label="${labelFinishVertex}", shape="plaintext"];\n\t${vertex} -> ${finishVertex};`
            }
        }

        for (const t in fuzzyAutomata.T) {
            for (let i = 0; i < fuzzyAutomata.T[t].length; i++) {
                for (let j = 0; j < fuzzyAutomata.T[t][i].length; j++) {
                    if (fuzzyAutomata.T[t][i][j]) {
                        if (!(t === 'E' && i === j)) {
                            const startVertex = fuzzyAutomata.Q[i] + index
                            const finishVertex = fuzzyAutomata.Q[j] + index
                            const label = t === 'E' ? `  ${t}` : `  ${t} / ${fuzzyAutomata.T[t][i][j].toFixed(3).replace(/0*$/, '').replace(/\.$/, '')}  `
                            const style = t === 'E' ? 'dashed' : 'solid'

                            const regexp = new RegExp(`(?<=${startVertex} -> ${finishVertex}.+label=")(.+?)(?=")`)

                            if (regexp.test(previousDot)) {
                                previousDot = previousDot.replace(regexp, `$1\\n${label}`)
                            } else {
                                previousDot += `\n\t${startVertex} -> ${finishVertex} [label="${label}", style="${style}"];`
                            }
                        }
                    }
                }
            }
        }

        return previousDot
    }, '')

    console.log(`digraph {${tempDot}}`)

    return `digraph {${tempDot}}`
}
