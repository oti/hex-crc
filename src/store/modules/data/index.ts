import { PresetColorItems } from "@/configs/PresetColorItems";
import { RootState } from "@/store/models";
import { actions } from "./actions";
import { getters } from "./getters";
import { DataState as ThisState } from "./models";
import { mutations } from "./mutations";
import { Module } from "vuex";

export const state: () => ThisState = () => ({
  colorItems: PresetColorItems,
  darkMode: false,
  largeText: false,
  string: JSON.stringify(PresetColorItems),
});

export const storeModule: Module<ThisState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
