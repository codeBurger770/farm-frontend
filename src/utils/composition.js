export default function composition(a, b) {
    let c = null

    if (Array.isArray(b[0])) {
        c = []

        for (let i = 0; i < b.length; i++) {
            c[i] = 0

            for (let j = 0; j < b.length; j++) {
                c[i] = Math.max(c[i], Math.min(a[j], b[j][i]))
            }
        }
    } else {
        c = 0

        for (let i = 0; i < b.length; i++) {
            c = Math.max(c, Math.min(a[i], b[i]))
        }
    }

    return c
}
