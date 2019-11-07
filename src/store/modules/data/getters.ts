import { DefinedGetterTree } from '@/store/models'
import { state as defaultState } from '@/store/modules/data/index'
import { DataGetterReturns, DataState } from '@/store/modules/data/models'
import { pickState } from '@/store/utilities'

export const getters: DefinedGetterTree<DataState, DataGetterReturns> = {
  /**
   * ViewModel
   * @param state
   */
  viewModel: state => pickState(defaultState, state)
}
