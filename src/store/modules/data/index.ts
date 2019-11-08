import { PresetColorItems } from '@/configs/PresetColorItems'
import { DefinedModule, StateCreator } from '@/store/models'
import { actions } from '@/store/modules/data/actions'
import { getters } from '@/store/modules/data/getters'
import {
  DataActionPayloads,
  DataGetterReturns,
  DataMutationPayloads,
  DataState
} from '@/store/modules/data/models'
import { mutations } from '@/store/modules/data/mutations'

export const state: StateCreator<DataState> = () => ({
  colorItems: PresetColorItems,
  string: JSON.stringify(PresetColorItems)
})

export const storeModule: DefinedModule<
  DataState,
  DataGetterReturns,
  DataMutationPayloads,
  DataActionPayloads
> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
