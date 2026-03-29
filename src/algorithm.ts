export const execute = (
  graph: number[][] = [],
  verCount: number,
  verStart: number,
  verEnd: number,
) => {
  let dist: number[] = new Array(verCount).fill(Infinity)
  dist[verStart] = 0

  for (let i = 0; i < verCount - 1; i++) {
    for (let item of graph) {
      let u = item[0]
      let v = item[1]
      let w = item[2]
      if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w
      }
    }
  }

  for (let item of graph) {
    let u = item[0]
    let v = item[1]
    let w = item[2]
    if (dist[u] != Infinity && dist[u] + w < dist[v]) {
      console.log('???')
    }
  }

  dist.map((item, index) => console.log(index, item))
  console.log(dist[verEnd])
  return dist[verEnd]
}
