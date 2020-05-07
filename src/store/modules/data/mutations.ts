import { ColorItem } from '@/models/ColorItem'
import { DefinedMutationTree } from '@/store/models'
import { DataMutationPayloads, DataState } from '@/store/modules/data/models'
import {
  ADD_COLOR_ITEM,
  CLEAR_COLOR_ITEM,
  REMOVE_COLOR_ITEM,
  CONVERT_COLOR_ITEMS_TO_STRING,
  CONVERT_STRING_TO_COLOR_ITEMS,
  UPDATE_COLOR,
  UPDATE_TEXT_AREA_VALUE
} from '@/store/modules/data/mutation-types'

const getDefaultItem = (front: string = '', back: string = ''): ColorItem => ({
  front,
  back
})

export const mutations: DefinedMutationTree<DataState, DataMutationPayloads> = {
  /**
   * カラーアイテムを１つ追加する
   * 追加ボタンを押したカラーアイテムの値がコピーされる
   */
  [ADD_COLOR_ITEM](state, index) {
    const { front, back } = state.colorItems[index]
    state.colorItems.splice(index + 1, 0, getDefaultItem(front, back))
  },

  /**
   * カラーアイテムを１つクリアする
   */
  [CLEAR_COLOR_ITEM](state, index) {
    state.colorItems.splice(index, 1, getDefaultItem())
  },

  /**
   * カラーアイテムを１つ削除する
   */
  [REMOVE_COLOR_ITEM](state, index) {
    state.colorItems.splice(index, 1)
  },

  /**
   * カラーセットから文字列に変換する
   */
  [CONVERT_COLOR_ITEMS_TO_STRING](state) {
    state.string = JSON.stringify(state.colorItems)
  },

  /**
   * 文字列からカラーセットに変換する
   */
  [CONVERT_STRING_TO_COLOR_ITEMS](state) {
    state.colorItems = JSON.parse(JSON.parse(JSON.stringify(state.string)))
  },

  /**
   * あるカラーセットの back キー か front キーの value を更新する
   */
  [UPDATE_COLOR](state, payload) {
    state.colorItems[payload.index][payload.target] = payload.color
  },

  /**
   * テキストエリアの値を更新する
   */
  [UPDATE_TEXT_AREA_VALUE](state, payload) {
    state.string = payload
  }
}
