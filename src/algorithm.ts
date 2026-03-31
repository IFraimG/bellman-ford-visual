type GraphEdge = [number, number, number]

export const execute = (
  graph: GraphEdge[],
  verCount: number = 0,
  verStart: number = 0,
  verEnd: number = 0,
): number => {
  if (
    verCount <= 0 ||
    graph.length == 0 ||
    graph.length != graph.filter((item) => item.length == 3).length
  ) {
    return 0
  }

  const dist: number[] = Array.from({ length: verCount }, () => Infinity)
  dist[verStart] = 0

  for (let i = 0; i < verCount - 1; i++) {
    for (const item of graph) {
      const [u, v, w]: GraphEdge = item
      if (dist[u] !== Infinity && dist[u]! + w < dist[v]!) {
        dist[v] = dist[u]! + w
      }
    }
  }

  for (const item of graph) {
    const [u, v, w]: GraphEdge = item
    if (dist[u] !== Infinity && dist[u]! + w < dist[v]!) {
      throw new Error('Graph contains a negative weight cycle')
    }
  }

  return dist[verEnd]!
}
