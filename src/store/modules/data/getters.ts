import { RootState } from "@/store/models";
import { pickState } from "@/store/utilities";
import { state as defaultState } from "./index";
import { DataGetters as ThisGetter, DataState as ThisState } from "./models";
import { GetterTree } from "vuex";

export const getters: GetterTree<ThisState, RootState> = {
  /**
   * ViewModel
   * @param state
   */
  viewModel: (state) => ({
    ...pickState(defaultState, state),
  }),
};
