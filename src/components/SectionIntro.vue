<template>
  <section class="SectionIntro">
    <!-- <ThemeToggler /> -->
    <h2 class="SectionHeading">なにこれ？</h2>
    <p>
      HEXの2色（前景色と背景色）のカラーセットからコントラスト比を計算し、WCAG2.1が定める基準を達成しているかを検証します。
    </p>
    <details class="Details">
      <summary class="__summary">
        詳細
      </summary>
      <div class="__content">
        <ul>
          <li>HEX以外を入力すると正しく判定できません</li>
          <li>複数のカラーセットを比較できます</li>
          <li>
            テキストエリアに連想配列を入力してカラーセットに変換できます
          </li>
          <li>逆に、調整したカラーセットを連想配列に変換できます</li>
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
          本検証ツールではコントラスト比が 3.0 以上 4.5 未満で「Not
          Bad」とし、3.0 未満は「Fail」としています。
        </p>
        <p>
          <strong id="not-bad-and-fail" class="Strong">
            「Not
            Bad」「Fail」の区分は本検証ツールが独自に提案しているものであり、WCAGが公式に示している指標ではありません。
          </strong>
        </p>
        <p>
          また、WCAGの基準に達していないからといって見づらいとは限りませんし、達しているからといって全て見やすい訳ではありません。
        </p>
        <p>
          コントラスト比の数字だけ見て判断せず、実際のプロダクトに当てはめて包括的な判断をするための補助ツールとしてご利用ください。
        </p>
        <p>
          カラーセット欄にある「大きなテキスト」のチェックボックスで、大きなテキストサイズの時の達成基準をトグルできます。
        </p>
        <p>
          大きなテキストとは、日本語の場合22pt以上のテキストか、もしくは太字で18pt以上のテキストを指します。
        </p>
      </div>
    </details>
  </section>
</template>

<script lang="ts">
import ThemeToggler from '@/components/ThemeToggler.vue'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {
    ThemeToggler
  }
})
export default class SectionIntro extends Vue {}
</script>

<style lang="sass" scoped>
.Strong
  color: #c90000
</style>
