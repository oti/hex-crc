import { DefinedActionTree, VuexActionDispatchers } from '@/store/models'
import {
  DECREMENT_GLOBAL_LOADING_QUEUE,
  INCREMENT_GLOBAL_LOADING_QUEUE,
  TOGGLE_DARK_MODE,
  TOGGLE_TEXT_AREA,
  TOGGLE_TEXT_SIZE
} from '@/store/modules/ui/mutation-types'

export interface UiState {
  darkMode: boolean
  globalLadingQueue: number
  largeText: boolean
  showsTextArea: boolean
}

export interface UiViewModel extends UiState {
  hasGlobalLoadingQueue: UiGetterReturns['hasGlobalLoadingQueue']
}

export interface UiGetterReturns {
  hasGlobalLoadingQueue: boolean
  viewModel: UiViewModel
}

export interface UiMutationPayloads {
  [DECREMENT_GLOBAL_LOADING_QUEUE]: number | undefined
  [INCREMENT_GLOBAL_LOADING_QUEUE]: number | undefined
  [TOGGLE_DARK_MODE]: boolean
  [TOGGLE_TEXT_AREA]: boolean
  [TOGGLE_TEXT_SIZE]: boolean
}

export interface UiActionPayloads {
  decrementGlobalLoadingQueue: UiMutationPayloads[typeof DECREMENT_GLOBAL_LOADING_QUEUE]
  incrementGlobalLoadingQueue: UiMutationPayloads[typeof INCREMENT_GLOBAL_LOADING_QUEUE]
  toggleDarkMode: UiMutationPayloads[typeof TOGGLE_DARK_MODE]
  toggleTextArea: UiMutationPayloads[typeof TOGGLE_TEXT_AREA]
  toggleTextSize: UiMutationPayloads[typeof TOGGLE_TEXT_SIZE]
}

export type UiActionTree = DefinedActionTree<UiState, UiActionPayloads>

export type UiActionDispatchers = VuexActionDispatchers<
  UiActionTree,
  UiState,
  UiActionPayloads
>
