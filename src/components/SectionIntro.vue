<template>
  <section class="SectionIntro">
    <ThemeToggler />
    <h2 class="SectionHeading">なにこれ？</h2>
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
</template>

<script lang="ts">
import ThemeToggler from '@/components/ThemeToggler.vue'
import { UiActionDispatchers, UiViewModel } from '@/store/modules/ui/models'
import { Component, Vue } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'

@Component({
  components: {
    ThemeToggler
  }
})
export default class SectionIntro extends Vue {
  /**
   * viewModel を引き当てる
   */
  @Getter('ui/viewModel') ui!: UiViewModel

  /**
   * アクションを引き当てる
   */
  @Action('ui/toggleTextArea')
  toggleTextArea!: UiActionDispatchers['toggleTextArea']
}
</script>

<style lang="sass" scoped></style>
