<template>
  <div class="Home">
    <GlobalHeader />
    <div class="__content">
      <div class="__intro">
        <p>
          HEXの2色からコントラスト比を計算し、WCAG2.0が定める基準を達成しているか判定します。
        </p>
        <ul>
          <li>HEX以外を入力すると判定できません</li>
          <li>複数のカラーセットを比較できます</li>
          <li>テキストエリアに連想配列を入力してカラーセットに変換できます</li>
          <li>逆に、調整したカラーセットを連想配列に変換できます</li>
        </ul>
      </div>
      <div class="__textarea">
        <TextArea :value="textAreaValue" @input="handleInputTextArea" />
      </div>
      <div class="__action">
        <button class="ConvertButton" type="button" @click="convertDataToItems">
          <i class="material-icons" aria-hidden="true">get_app</i>
          <span>連想配列からリストに変換</span>
        </button>
        <button class="ConvertButton" type="button" @click="convertItemsToData">
          <i class="material-icons" aria-hidden="true">publish</i>
          <span>リストから連想配列に変換</span>
        </button>
      </div>
      <div class="__list">
        <ContrastRatioItemRow
          v-for="(item, i) in items"
          :key="i"
          :label="i === 0"
          :item-title="itemTitle(i)"
          :removable="items.length > 1"
          :value="item"
          @add="handleAddItem(i)"
          @clear="handleClearItem(i)"
          @remove="handleRemoveItem(i)"
        />
      </div>
    </div>
    <GlobalFooter />
  </div>
</template>

<script lang="ts">
import ContrastRatioItemRow from '@/components/ContrastRatioItemRow.vue'
import GlobalFooter from '@/components/GlobalFooter.vue'
import GlobalHeader from '@/components/GlobalHeader.vue'
import TextArea from '@/components/TextArea.vue'
import { ColorSet } from '@/models/ColorSet'
import { NullableString } from '@/models/NullableString'
import { Component, Prop, Vue } from 'vue-property-decorator'

const getDefaultItem = (
  front: NullableString = null,
  back: NullableString = null
): ColorSet => ({
  front,
  back
})

@Component({
  components: {
    ContrastRatioItemRow,
    GlobalFooter,
    GlobalHeader,
    TextArea
  }
})
export default class Home extends Vue {
  /**
   * 内部ステートを定義
   */
  textAreaValue: string = `[
    {
      front: '#435a6c',
      back: '#fefcfc'
    }
  ]`
  items: ColorSet[] = [
    {
      front: '#435a6c',
      back: '#fefcfc'
    }
  ]
  /**
   * @method - テキストをItemsのJSONに変換する
   */
  convertDataToItems() {
    this.items = JSON.parse(
      JSON.parse(JSON.stringify(this.textAreaValue))
    ) as ColorSet[]
  }

  /**
   * @method - Itemsのjsonをテキストに変換する
   */
  convertItemsToData() {
    this.textAreaValue = JSON.stringify(this.items)
  }

  /**
   * @method - カラーセットアイテムのタイトルを返す
   * @param i
   */
  itemTitle(i: number) {
    return `カラーセット${i + 1}`
  }

  /**
   * @listens TextArea@input - textareaの入力
   * @param value
   */
  handleInputTextArea(value: string) {
    this.textAreaValue = value
  }

  /**
   * @listens ContrastRatioItemRow@add - カラーセットアイテムの追加
   * @param i
   */
  handleAddItem(i: number) {
    const { front, back } = this.items[i]
    this.items.splice(i + 1, 0, getDefaultItem(front, back))
  }

  /**
   * @listens ContrastRatioItemRow@clear - カラーセットアイテムの色情報のクリア
   * @param i
   */
  handleClearItem(i: number) {
    this.items.splice(i, 1, getDefaultItem())
  }

  /**
   * @listens ContrastRatioItemRow@remove - カラーセットアイテムの削除
   * @param i
   */
  handleRemoveItem(i: number) {
    this.items.splice(i, 1)
  }
}
</script>

<style lang="sass" scoped>
@import '../assets/styles/configs'
.Home
  .__content
    margin: 2rem auto
    max-width: 600px

  .__intro
    padding-right: calc(var(--spaceGap) * 2);
    padding-left: calc(var(--spaceGap) * 2);
    font-size: 0.75rem

  .__textarea
    padding-right: calc(var(--spaceGap) * 2)
    padding-left: calc(var(--spaceGap) * 2)
    + .__action
      margin-top: 0.5rem

  .__action
    text-align: center

    + .__list
      margin-top: 3rem

  .__list

.ConvertButton
  @extend %resetButton
  display: inline-flex
  justify-content: center
  align-items: center
  margin: calc(var(--spaceGap) / 2)
  padding: calc(var(--spaceGap) / 1.5) calc(var(--spaceGap) * 2)
  border: 1px solid var(--colorBorder)
  border-radius: 4px
  font-size: 0.7rem
  line-height: 1.2
  vartical-align: top
  background-color: #f5f4f5
  &:active
    transform: translateY(1px)
</style>
