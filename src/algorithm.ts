export const execute = (
  graph: number[][],
  verCount: number = 0,
  verStart: number = 0,
  verEnd: number = 0,
) => {
  const dist: number[] = Array.from({ length: verCount! }, () => Infinity)
  dist[verStart] = 0

  for (let i = 0; i < verCount - 1; i++) {
    for (const item of graph) {
      const u: number = item[0] ?? 0
      const v: number = item[1] ?? 0
      const w: number = item[2] ?? 0
      if (dist[u] !== Infinity && dist[u]! + w < dist[v]!) {
        dist[v] = dist[u]! + w
      }
    }
  }

  for (const item of graph) {
    const u: number = item[0] ?? 0
    const v: number = item[1] ?? 0
    const w: number = item[2] ?? 0
    if (dist[u] != Infinity && dist[u]! + w < dist[v]!) {
      console.log('???')
    }
  }

  dist.map((item, index) => console.log(index, item))
  return dist[verEnd]
}
