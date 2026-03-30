<template>
  <div class="wrapper">
    <VueFlow :nodes="nodes" :edges="edges" :nodes-draggable="false" :nodes-selectable="false">
      <Panel>
        <div class="form-ver">
          <input
            type="text"
            v-model="formState.state.newEdge.inputVer"
            placeholder="A ->"
            maxLength="1"
            class="ver-input"
          />
          <input
            type="text"
            v-model="formState.state.newEdge.outputVer"
            placeholder="<- B"
            minLength="1"
            class="ver-input"
          />
          <input
            type="number"
            v-model="formState.state.newEdge.weightVer"
            placeholder="Вес"
            minLength="1"
            class="ver-input"
          />
          <button class="form-ver-button" @click="createEdge">Соединить вершины</button>
        </div>
        <button class="form-ver-button" @click="() => appendVer()">Добавить вершину</button>
        <div class="form-ver">
          <input
            type="text"
            v-model="formState.state.pathSearch.startVer"
            placeholder="Начальная вершина"
            maxLength="1"
          />
          <input
            type="text"
            v-model="formState.state.pathSearch.endVer"
            placeholder="Конечная вершина"
            maxLength="1"
          />
          <button class="form-ver-button" @click="findRoute">Найти кратчайший маршрут</button>
        </div>
      </Panel>
    </VueFlow>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { VueFlow, Panel, Position } from '@vue-flow/core'
import type { Node, Edge } from '@vue-flow/core'
import { execute } from './algorithm'
import './style.css'
import useValidation from './useValidation'

const STEP = 350

const nodes = ref<Node[]>([
  {
    id: '0',
    position: { x: 100, y: 200 },
    data: { label: 'A' },
    class: 'vue-node-custom-class',
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
  },
])

const labelEdgeStyle = {
  fill: '#417d67',
  fontWeight: 700,
  fontSize: '24px',
}

const edgeStyle = {
  stroke: '#417d67',
  strokeWidth: 2,
}

const edges = ref<Edge>([
  // {
  //   id: '01',
  //   type: 'default',
  //   source: '0',
  //   target: '1',
  //   class: "vue-edge-custom-class",
  //   label: '30',
  //   style: edgeStyle,
  //   labelStyle: labelEdgeStyle,
  // }
])

const { formState, resetNewEdge, resetPathSearch, validateNewEdgeForm, validatePathSearchForm } =
  useValidation()

const appendVer = (edgeSymbol: String | null) => {
  const copyNodeValues = [...nodes.value]
  const length = copyNodeValues.length
  const lastElement = copyNodeValues[length - 1]

  const newVerID = parseInt(lastElement.id) + 1
  const newVerTitle =
    edgeSymbol == null ? lastElement.data.label.charCodeAt() + 1 : edgeSymbol.charCodeAt(0)
  const newVerCoordX = length % 5 == 0 ? 100 : parseInt(lastElement.position.x) + STEP
  const newVerCoordY =
    length % 5 == 0 ? parseInt(lastElement.position.y) + STEP : parseInt(lastElement.position.y)

  const ver = {
    id: newVerID.toString(),
    position: { x: newVerCoordX, y: newVerCoordY },
    class: 'vue-node-custom-class',
    data: { label: String.fromCharCode(newVerTitle) },
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
  }

  return nodes.value.push(ver)
}

const createEdge = () => {
  if (!validateNewEdgeForm()) {
    alert('Неверно указаны данные!')
    return
  }
  let inputVerIndex = nodes.value.findIndex(
    (item) => item.data.label == formState.state.newEdge.inputVer,
  )
  if (inputVerIndex == -1) {
    inputVerIndex = appendVer(formState.state.newEdge.inputVer) - 1
  }

  let outputVerIndex = nodes.value.findIndex(
    (item) => item.data.label == formState.state.newEdge.outputVer,
  )
  if (outputVerIndex == -1) {
    outputVerIndex = appendVer(formState.state.newEdge.outputVer) - 1
  }

  if (parseInt(nodes.value[inputVerIndex].id) > nodes.value[outputVerIndex].id) {
    nodes.value[inputVerIndex] = {
      ...nodes.value[inputVerIndex],
      targetPosition: Position.Right,
    }
    nodes.value[outputVerIndex] = {
      ...nodes.value[outputVerIndex],
      targetPosition: Position.Left,
    }
  }

  nodes.value[inputVerIndex] = { ...nodes.value[inputVerIndex], type: 'input' }
  nodes.value[outputVerIndex] = { ...nodes.value[outputVerIndex], type: 'output' }
  edges.value.push({
    id: `${nodes.value[inputVerIndex].id}${nodes.value[outputVerIndex].id}`,
    type: 'default',
    source: nodes.value[inputVerIndex].id.toString(),
    target: nodes.value[outputVerIndex].id.toString(),
    label: formState.state.newEdge.weightVer.toString(),
    class: 'vue-edge-custom-class',
    style: edgeStyle,
    labelStyle: labelEdgeStyle,
    labelBgPadding: [2, 4],
    labelBgBorderRadius: 2,
  })

  resetNewEdge()
}

const findRoute = () => {
  if (!validatePathSearchForm(nodes.value.map((item: Node) => item.data.label))) {
    alert('Неверно указаны данные!')
    return
  }
  const startVer = nodes.value.find(
    (item: Node) => item.data.label == formState.state.pathSearch.startVer,
  )?.id
  const verEnd = nodes.value.find(
    (item: Node) => item.data.label == formState.state.pathSearch.endVer,
  )?.id
  const graph: number[][] = edges.value.map((item: Edge) => {
    return [parseInt(item.source), parseInt(item.target), parseInt(item.label)]
  })
  let maxValue = graph[0][0]
  graph.forEach((item) => {
    maxValue = Math.max(maxValue, item[0])
    maxValue = Math.max(maxValue, item[1])
  })

  const result = execute(graph, maxValue + 1, parseInt(startVer), verEnd)
  alert(
    `Итоговый результат ${formState.state.pathSearch.startVer} -> ${formState.state.pathSearch.endVer}: ${result}`,
  )

  resetPathSearch()
}
</script>
