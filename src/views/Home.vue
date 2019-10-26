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
        <button class="Button" type="button" @click="handleClickToggleTextArea">
          <i class="material-icons" aria-hidden="true">flip</i>
          <span v-if="showsTextArea">テキストエリアを隠す</span>
          <span v-else>テキストエリアを表示する</span>
        </button>
      </div>
      <div v-if="showsTextArea" class="__textarea">
        <TextArea :value="textAreaValue" @input="handleInputTextArea" />
      </div>
      <div v-if="showsTextArea" class="__action">
        <button
          class="Button"
          type="button"
          @click="handleClickConvertDataToItems"
        >
          <i class="material-icons" aria-hidden="true">get_app</i>
          <span>連想配列からセットに変換</span>
        </button>
        <button
          class="Button"
          type="button"
          @click="handleClickConvertItemsToData"
        >
          <i class="material-icons" aria-hidden="true">publish</i>
          <span>セットから連想配列に変換</span>
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
import { SampleColor12 } from '@/configs/SampleColor12'
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
  items: ColorSet[] = SampleColor12
  showsTextArea: boolean = false
  textAreaValue: string = `${this.items}`

  /**
   * @listens Button@click - テキストエリアの値をItemsに変換する
   */
  handleClickConvertDataToItems() {
    this.items = JSON.parse(
      JSON.parse(JSON.stringify(this.textAreaValue))
    ) as ColorSet[]
  }

  /**
   * @listens Button@click - Itemsをテキストエリアの値に変換する
   */
  handleClickConvertItemsToData() {
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
   * @listens Button@click - テキストエリアの表示をトグルする
   */
  handleClickToggleTextArea() {
    this.showsTextArea = !this.showsTextArea
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
    font-size: 0.7rem
    + .__textarea
      margin-top: calc(var(--spaceGap) * 1)
    + .__list
      margin-top: calc(var(--spaceGap) * 7)

  .__textarea
    padding-right: calc(var(--spaceGap) * 2)
    padding-left: calc(var(--spaceGap) * 2)
    + .__action
      margin-top: calc(var(--spaceGap) * 1)

  .__action
    text-align: center
    + .__list
      margin-top: calc(var(--spaceGap) * 7)

  .__list

.Button
  @extend %resetButton
  display: inline-flex
  justify-content: center
  align-items: center
  margin: 0
  padding: calc(var(--spaceGap) / 1.5) calc(var(--spaceGap) * 1.5) calc(var(--spaceGap) / 1.625)
  border: 1px solid var(--colorBorder)
  border-radius: 4px
  font-size: 0.65rem
  line-height: 1.2
  vartical-align: top
  background-color: #f5f4f5
  &:active
    transform: translateY(1px)

  .material-icons
    margin-right: 0.125rem
</style>
