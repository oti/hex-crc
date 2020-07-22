import {
  DataMutationPayloads as ThisMutationPayloads,
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
import { createColorItem } from "@/utilities/createColorItem";
import { clearArray, replaceArray } from "@/utilities/array";
import { MutationTree } from "vuex";

export const mutations: MutationTree<ThisState> = {
  /**
   * カラーアイテムを１つ追加する
   * 追加ボタンを押したカラーアイテムの値がコピーされる
   */
  [ADD_COLOR_ITEM](
    state,
    payload: ThisMutationPayloads[typeof ADD_COLOR_ITEM]
  ) {
    const { front, back } = state.colorItems[payload];
    state.colorItems.splice(payload + 1, 0, createColorItem(front, back));
  },

  /**
   * カラーアイテムを１つクリアする
   */
  [CLEAR_COLOR_ITEM](
    state,
    payload: ThisMutationPayloads[typeof CLEAR_COLOR_ITEM]
  ) {
    state.colorItems.splice(payload, 1, createColorItem());
  },

  /**
   * カラーアイテムを１つ削除する
   */
  [REMOVE_COLOR_ITEM](
    state,
    payload: ThisMutationPayloads[typeof REMOVE_COLOR_ITEM]
  ) {
    state.colorItems.splice(payload, 1);
  },

  /**
   * カラーセットから文字列に変換する
   */
  [CONVERT_COLOR_ITEMS_TO_STRING](state) {
    state.string = JSON.stringify(state.colorItems);
  },

  /**
   * 文字列からカラーセットに変換する
   */
  [CONVERT_STRING_TO_COLOR_ITEMS](state) {
    replaceArray(
      state.colorItems,
      ...JSON.parse(JSON.parse(JSON.stringify(state.string)))
    );
  },

  /**
   * ダークモードをトグルする
   * @param state
   */
  [TOGGLE_DARK_MODE](state) {
    state.darkMode = !state.darkMode;
  },

  /**
   * テキストの大きさをトグルする
   */
  [TOGGLE_TEXT_SIZE](state) {
    state.largeText = !state.largeText;
  },

  /**
   * あるカラーセットの back キー か front キーの value を更新する
   */
  [UPDATE_COLOR](state, payload: ThisMutationPayloads[typeof UPDATE_COLOR]) {
    state.colorItems[payload.index][payload.target] = payload.color;
  },

  /**
   * テキストエリアの値を更新する
   */
  [UPDATE_TEXT_AREA_VALUE](
    state,
    payload: ThisMutationPayloads[typeof UPDATE_TEXT_AREA_VALUE]
  ) {
    state.string = payload;
  },
};
