<template>
  <section class="SectionIntro">
    <!-- <ThemeToggler /> -->
    <h2 class="SectionHeading">なにこれ？</h2>
    <p>
      HEXの2色（前景色と背景色）のカラーセットからコントラスト比を計算し、WCAG2.1が定める基準を達成しているかを検証します。
    </p>
    <ul>
      <li>HEX以外を入力すると正しく判定できません</li>
      <li>複数のカラーセットを比較できます</li>
      <li>
        テキストエリアにJSONを入力してカラーセットに変換できます
      </li>
      <li>逆に、調整したカラーセットをJSONに変換できます</li>
    </ul>
    <p>達成レベルのAAとAAAについては下記のリンクを参考にしています。</p>
    <ul>
      <li>
        <a
          href="https://waic.jp/docs/WCAG21/#contrast-minimum"
          target="_blank"
          rel="noopener"
          >WCAG2.1 達成基準 1.4.3 コントラスト (最低）</a
        >
      </li>
      <li>
        <a
          href="https://waic.jp/docs/WCAG21/#contrast-enhanced"
          target="_blank"
          rel="noopener"
          >WCAG2.1 達成基準 1.4.6 コントラスト (高度）</a
        >
      </li>
    </ul>
    <p>
      WCAG2.1にはコントラスト比についてレベルA（シングルA）の達成基準がありません。本検証ツールではコントラスト比が
      4.5 未満で 3.0 以上は「Not Bad」とし、3.0 未満は「Fail」としています。
    </p>
    <p>
      <small
        >*「大きなテキスト」とは日本語の場合、22pt以上か、あるいは太字で18pt以上のテキストの場合を差します。</small
      >
    </p>
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
