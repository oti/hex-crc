import { ColorItem } from '@/models/ColorItem'
import { DataActionTree } from '@/store/modules/data/models'
import {
  ADD_COLOR_ITEM,
  CLEAR_COLOR_ITEM,
  REMOVE_COLOR_ITEM,
  CONVERT_COLOR_ITEMS_TO_STRING,
  CONVERT_STRING_TO_COLOR_ITEMS,
  UPDATE_TEXT_AREA_VALUE
} from '@/store/modules/data/mutation-types'

export const actions: DataActionTree = {
  /**
   * カラーセットを１つ追加する
   */
  addColorItem({ commit }, index) {
    commit(ADD_COLOR_ITEM, index)
  },

  /**
   * カラーセットの１つをクリアする
   */
  clearColorItem({ commit }, index) {
    commit(CLEAR_COLOR_ITEM, index)
  },

  /**
   * カラーセットの１つを削除する
   */
  removeColorItem({ commit }, index) {
    commit(REMOVE_COLOR_ITEM, index)
  },

  /**
   * カラーセットをカラーアイテムに変換する
   * @param commit
   */
  convertStringToColorItems({ commit }, payload) {
    commit(CONVERT_STRING_TO_COLOR_ITEMS, payload)
  },

  /**
   * カラーアイテムをカラーセットに変換する
   * @param commit
   */
  convertColorItemsToString({ commit }, payload) {
    commit(CONVERT_COLOR_ITEMS_TO_STRING, payload)
  },

  /**
   * テキストエリアの値を更新する
   * @param commit
   */
  updateTextAreaValue({ commit }, payload) {
    commit(UPDATE_TEXT_AREA_VALUE, payload)
  }
}
