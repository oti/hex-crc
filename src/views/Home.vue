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
        <TextArea />
      </section>

      <section v-if="ui.showsTextArea" class="__action">
        <button class="Button" type="button" @click="convertStringToColorItems">
          <i class="material-icons" aria-hidden="true">get_app</i>
          <span>連想配列からセットに変換</span>
        </button>
        <button class="Button" type="button" @click="convertColorItemsToString">
          <i class="material-icons" aria-hidden="true">publish</i>
          <span>セットから連想配列に変換</span>
        </button>
      </section>

      <section class="__list">
        <h2 class="__heading">カラーセット</h2>
        <ContrastRatioItemRow
          v-for="(item, i) in data.colorItems"
          :key="i"
          :label="i === 0"
          :item-title="itemTitle(i)"
          :removable="data.colorItems.length > 1"
          :value="item"
          @add="addColorItem(i)"
          @clear="clearColorItem(i)"
          @remove="removeColorItem(i)"
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
import {
  DataActionDispatchers,
  DataViewModel
} from '@/store/modules/data/models'
import { UiActionDispatchers, UiViewModel } from '@/store/modules/ui/models'
import { Component, Prop, Vue } from 'vue-property-decorator'
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
  @Getter('data/viewModel') data!: DataViewModel
  @Getter('ui/viewModel') ui!: UiViewModel

  /**
   * アクションを引き当てる
   */
  @Action('data/convertStringToColorItems')
  convertStringToColorItems!: DataActionDispatchers['convertStringToColorItems']
  @Action('data/convertColorItemsToString')
  convertColorItemsToString!: DataActionDispatchers['convertColorItemsToString']
  @Action('data/addColorItem')
  addColorItem!: DataActionDispatchers['addColorItem']
  @Action('data/clearColorItem')
  clearColorItem!: DataActionDispatchers['clearColorItem']
  @Action('data/removeColorItem')
  removeColorItem!: DataActionDispatchers['removeColorItem']
  @Action('ui/toggleTextArea')
  toggleTextArea!: UiActionDispatchers['toggleTextArea']

  /**
   * @method - カラーセットアイテムのタイトルを返す
   * @param i
   */
  itemTitle(i: number) {
    return `カラーセット${i + 1}`
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
</style>
