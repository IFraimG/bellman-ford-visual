import { reactive, computed } from 'vue'
import { z } from 'zod'

interface NewEdgeInterface {
  inputVer: string
  outputVer: string
  weightVer: number
}

interface PathSearchInterface {
  startVer: string
  endVer: string
}

interface formStateInterface {
  state: {
    newEdge: NewEdgeInterface
    pathSearch: PathSearchInterface
  }
}

const useValidation = () => {
  const formState: formStateInterface = reactive({
    state: {
      newEdge: {
        inputVer: '',
        outputVer: '',
        weightVer: 0,
      },
      pathSearch: {
        startVer: '',
        endVer: '',
      },
    },
    message: '',
  })

  const resetNewEdge = () => {
    formState.state.newEdge = {
      inputVer: '',
      outputVer: '',
      weightVer: 0,
    }
  }

  const resetPathSearch = () => {
    formState.state.pathSearch = {
      startVer: '',
      endVer: '',
    }
  }

  const formNewEdgeSchema = computed(() =>
    z.object({
      inputVer: z.string().min(1),
      outputVer: z.string().min(1),
      weightVer: z.number().positive().or(z.number().negative()),
    }),
  )

  const formPathSearchSchema = computed(() =>
    z.object({
      startVer: z.string().min(1),
      endVer: z.string().min(1),
    }),
  )

  const validateNewEdgeForm = () => {
    const result = formNewEdgeSchema.value.safeParse({
      inputVer: formState.state.newEdge.inputVer,
      outputVer: formState.state.newEdge.outputVer,
      weightVer: formState.state.newEdge.weightVer,
    })

    return result.success
  }

  const validatePathSearchForm = (nodesLabelsList: string[]) => {
    const result = formPathSearchSchema.value.safeParse({
      startVer: formState.state.pathSearch.startVer,
      endVer: formState.state.pathSearch.endVer,
    })

    return (
      result.success &&
      nodesLabelsList.includes(formState.state.pathSearch.startVer) &&
      nodesLabelsList.includes(formState.state.pathSearch.endVer)
    )
  }

  return {
    formState,
    resetNewEdge,
    resetPathSearch,
    validateNewEdgeForm,
    validatePathSearchForm,
  }
}

export default useValidation
