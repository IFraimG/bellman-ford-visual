import { expect, test } from 'vitest'
import { execute } from '../algorithm'

// 1. Пример из условия
test('example from task: negative edge via detour', () => {
  expect(
    execute(
      [
        [0, 1, 10],
        [1, 2, 20],
        [0, 3, 5],
        [3, 2, -10],
      ],
      4,
      0,
      2,
    ),
  ).equals(-5)
})

// 2. Прямое ребро
test('single direct edge', () => {
  expect(execute([[0, 1, 7]], 2, 0, 1)).equals(7)
})

// 3. Старт и конец совпадают
test('start equals end', () => {
  expect(execute([[0, 1, 5]], 2, 0, 0)).equals(0)
})

// 4. Нет пути между вершинами
test('no path exists', () => {
  expect(execute([[0, 1, 5]], 3, 0, 2)).equals(Infinity)
})

// 5. Цепочка рёбер
test('chain of edges', () => {
  expect(
    execute(
      [
        [0, 1, 1],
        [1, 2, 2],
        [2, 3, 3],
      ],
      4,
      0,
      3,
    ),
  ).equals(6)
})

// 6. Два пути, выбирается более короткий
test('two paths, shorter wins', () => {
  expect(
    execute(
      [
        [0, 2, 100],
        [0, 1, 10],
        [1, 2, 5],
      ],
      3,
      0,
      2,
    ),
  ).equals(15)
})

// 7. Отрицательное ребро делает путь оптимальным
test('negative edge makes path optimal', () => {
  expect(
    execute(
      [
        [0, 1, 10],
        [0, 2, 3],
        [2, 1, -8],
      ],
      3,
      0,
      1,
    ),
  ).equals(-5)
})

// 8. Все рёбра с одинаковым весом
test('all edges same weight', () => {
  expect(
    execute(
      [
        [0, 1, 5],
        [1, 2, 5],
        [2, 3, 5],
      ],
      4,
      0,
      3,
    ),
  ).equals(15)
})

// 9. Ребро с нулевым весом
test('zero weight edge', () => {
  expect(
    execute(
      [
        [0, 1, 0],
        [1, 2, 4],
      ],
      3,
      0,
      2,
    ),
  ).equals(4)
})

// 10. Несколько отрицательных рёбер
test('multiple negative edges', () => {
  expect(
    execute(
      [
        [0, 1, -1],
        [1, 2, -2],
        [2, 3, -3],
      ],
      4,
      0,
      3,
    ),
  ).equals(-6)
})

// 11. Граф с 5 вершинами, обходной путь выгоднее
test('5 nodes, detour is cheaper', () => {
  expect(
    execute(
      [
        [0, 4, 100],
        [0, 1, 10],
        [1, 2, 10],
        [2, 3, 10],
        [3, 4, 10],
      ],
      5,
      0,
      4,
    ),
  ).equals(40)
})

// 12. Путь через все вершины графа
test('path through all nodes in large graph', () => {
  expect(
    execute(
      [
        [0, 1, 2],
        [1, 2, 2],
        [2, 3, 2],
        [3, 4, 2],
        [4, 5, 2],
      ],
      6,
      0,
      5,
    ),
  ).equals(10)
})

// 13. Параллельные рёбра, выбирается лёгкое
test('parallel edges, lighter one chosen', () => {
  expect(
    execute(
      [
        [0, 1, 20],
        [0, 1, 5],
      ],
      2,
      0,
      1,
    ),
  ).equals(5)
})

// 14. Старт не 0
test('start node is not 0', () => {
  expect(
    execute(
      [
        [1, 2, 4],
        [2, 3, 6],
        [1, 3, 15],
      ],
      4,
      1,
      3,
    ),
  ).equals(10)
})

// 15. Большой отрицательный вес на одном ребре
test('one very large negative weight', () => {
  expect(
    execute(
      [
        [0, 1, 50],
        [0, 2, 1],
        [2, 1, -100],
      ],
      3,
      0,
      1,
    ),
  ).equals(-99)
})

// 16. Путь длиной 1 ребро в большом графе
test('short path in large graph', () => {
  expect(
    execute(
      [
        [0, 1, 3],
        [2, 3, 4],
        [4, 5, 5],
        [0, 5, 99],
      ],
      6,
      0,
      1,
    ),
  ).equals(3)
})

// 17. Смешанные положительные и отрицательные рёбра
test('mixed positive and negative edges', () => {
  expect(
    execute(
      [
        [0, 1, 5],
        [1, 2, -3],
        [2, 3, 4],
        [0, 3, 10],
      ],
      4,
      0,
      3,
    ),
  ).equals(6)
})

// 18. Недостижимая вершина в середине графа
test('unreachable middle node', () => {
  expect(
    execute(
      [
        [0, 1, 5],
        [3, 4, 5],
      ],
      5,
      0,
      4,
    ),
  ).equals(Infinity)
})

// 19. Два независимых пути к цели, выбирается минимальный
test('two independent paths to target', () => {
  expect(
    execute(
      [
        [0, 1, 10],
        [1, 4, 10],
        [0, 2, 5],
        [2, 3, 5],
        [3, 4, 5],
      ],
      5,
      0,
      4,
    ),
  ).equals(15)
})

// 20. Единственная вершина, путь к себе
test('single node graph', () => {
  expect(execute([], 1, 0, 0)).equals(0)
})
