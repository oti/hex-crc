<template>
  <div class="Home">
    <GlobalHeader />
    <main class="__content" role="main">
      <section class="__intro">
        <ThemeToggler />
        <h2 class="__heading">なにこれ？</h2>
        <p>
          HEXの2色（前景色と背景色）のカラーセットからコントラスト比を計算し、WCAG2.0が定める基準を達成しているかを判定します。
        </p>
        <ul>
          <li>HEX以外を入力すると正しく判定できません</li>
          <li>複数のカラーセットを比較できます</li>
          <li>テキストエリアに連想配列を入力してカラーセットに変換できます</li>
          <li>逆に、調整したカラーセットを連想配列に変換できます</li>
        </ul>
        <button class="Button -invert" type="button" @click="toggleTextArea">
          <i class="material-icons" aria-hidden="true">flip</i>
          <span v-if="ui.showsTextArea">テキストエリアを隠す</span>
          <span v-else>テキストエリアを表示する</span>
        </button>
      </section>

      <section v-if="ui.showsTextArea" class="__textarea">
        <p>
          ※連想配列は<code>key</code>と<code>value</code>をダブルクォーテーションで囲ってください。
        </p>
        <TextArea :value="textAreaValue" @input="handleInputTextArea" />
      </section>

      <section v-if="ui.showsTextArea" class="__action">
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
      </section>

      <section class="__list">
        <h2 class="__heading">カラーセット</h2>
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
      </section>
    </main>
    <GlobalFooter />
  </div>
</template>

<script lang="ts">
import ContrastRatioItemRow from '@/components/ContrastRatioItemRow.vue'
import GlobalFooter from '@/components/GlobalFooter.vue'
import GlobalHeader from '@/components/GlobalHeader.vue'
import TextArea from '@/components/TextArea.vue'
import ThemeToggler from '@/components/ThemeToggler.vue'
import { PresetColorItems } from '@/configs/PresetColorItems'
import { ColorItem } from '@/models/ColorItem'
import { NullableString } from '@/models/NullableString'
import { UiActionDispatchers, UiViewModel } from '@/store/modules/ui/models'
import { Component, Prop, Vue } from 'vue-property-decorator'

const getDefaultItem = (
  front: NullableString = null,
  back: NullableString = null
): ColorSet => ({
  front,
  back
})
import { Action, Getter } from 'vuex-class'

@Component({
  components: {
    ContrastRatioItemRow,
    GlobalFooter,
    GlobalHeader,
    TextArea,
    ThemeToggler
  }
})
export default class Home extends Vue {
  // viewModel を引き当てる
  @Getter('ui/viewModel') ui!: UiViewModel

  /**
   * アクションを引き当てる
   */
  showsTextArea: boolean = false
  textAreaValue: string = `${JSON.stringify(PresetColorSet)}`
  @Action('ui/toggleTextArea')
  toggleTextArea!: UiActionDispatchers['toggleTextArea']

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
    padding-right: calc(var(--spaceGap) * 2)
    padding-left: calc(var(--spaceGap) * 2)
    max-width: calc(var(--spaceGap) * 4 + 600px)
    font-size: 0.7rem

  .__heading
    margin: 0
    font-size: 1rem

  .__intro
    margin-top: calc(var(--spaceGap) * 4)

  .__textarea
    margin-top: calc(var(--spaceGap) * 1.5)

  .__action
    margin-top: calc(var(--spaceGap) * 1.5)
    text-align: center
    .Button
      margin: 0 calc(var(--spaceGap) / 2) calc(var(--spaceGap) * 1)

  .__list
    margin-top: calc(var(--spaceGap) * 4)
    font-size: 1rem

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
  vertical-align: top
  background-color: #f5f4f5
  &.-invert
    border-color: transparent
    color: #ffffff
    background-color: var(--colorText)
  &:active
    transform: translateY(1px)

  .material-icons
    margin-right: 0.125rem
</style>
