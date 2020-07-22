import { RootState } from "@/store/models";
import {
  DataActionPayloads as ThisActionPayloads,
  DataState as ThisState,
} from "./models";
import {
  ADD_COLOR_ITEM,
  CLEAR_COLOR_ITEM,
  REMOVE_COLOR_ITEM,
  CONVERT_COLOR_ITEMS_TO_STRING,
  CONVERT_STRING_TO_COLOR_ITEMS,
  TOGGLE_DARK_MODE,
  TOGGLE_TEXT_SIZE,
  UPDATE_COLOR,
  UPDATE_TEXT_AREA_VALUE,
} from "./mutation-types";
import { ActionTree } from "vuex";

export const actions: ActionTree<ThisState, RootState> = {
  /**
   * カラーセットを１つ追加する
   */
  addColorItem({ commit }, payload: ThisActionPayloads["addColorItem"]) {
    commit(ADD_COLOR_ITEM, payload);
  },

  /**
   * カラーセットの１つをクリアする
   */
  clearColorItem({ commit }, payload: ThisActionPayloads["clearColorItem"]) {
    commit(CLEAR_COLOR_ITEM, payload);
  },

  /**
   * カラーセットの１つを削除する
   */
  removeColorItem({ commit }, payload: ThisActionPayloads["removeColorItem"]) {
    commit(REMOVE_COLOR_ITEM, payload);
  },

  /**
   * カラーセットをカラーアイテムに変換する
   * @param commit
   */
  convertStringToColorItems(
    { commit },
    payload: ThisActionPayloads["convertStringToColorItems"]
  ) {
    commit(CONVERT_STRING_TO_COLOR_ITEMS, payload);
  },

  /**
   * カラーアイテムをカラーセットに変換する
   * @param commit
   */
  convertColorItemsToString(
    { commit },
    payload: ThisActionPayloads["convertColorItemsToString"]
  ) {
    commit(CONVERT_COLOR_ITEMS_TO_STRING, payload);
  },

  /**
   * ダークモードをトグルする
   * @param commit
   */
  toggleDarkMode({ commit }) {
    commit(TOGGLE_DARK_MODE);
  },

  /**
   * テキストの大きさをトグルする
   */
  toggleTextSize({ commit }) {
    commit(TOGGLE_TEXT_SIZE);
  },

  /**
   * あるカラーセットの back か front の値を更新する
   * @param commit
   */
  updateColor({ commit }, payload: ThisActionPayloads["updateColor"]) {
    commit(UPDATE_COLOR, payload);
  },

  /**
   * テキストエリアの値を更新する
   * @param commit
   */
  updateTextAreaValue(
    { commit },
    payload: ThisActionPayloads["updateTextAreaValue"]
  ) {
    commit(UPDATE_TEXT_AREA_VALUE, payload);
  },
};
