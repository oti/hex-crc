<template>
  <section class="SectionTextArea">
    <p>
      ※連想配列は<code>key</code>と<code>value</code>をダブルクォーテーションで囲ってください。
    </p>
    <textarea
      class="__textarea"
      :value="data.string"
      @input="handleInputTextArea"
    />
  </section>
</template>

<script lang="ts">
import { HTMLElementEvent } from '@/models/HTMLElementEvent'
import { UiViewModel } from '@/store/modules/ui/models'
import {
  DataActionDispatchers,
  DataViewModel
} from '@/store/modules/data/models'
import { Component, Vue } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'

@Component
export default class SectionTextArea extends Vue {
  /**
   * viewModel を引き当てる
   */
  @Getter('data/viewModel') data!: DataViewModel
  @Getter('ui/viewModel') ui!: UiViewModel

  /**
   * アクションを引き当てる
   */
  @Action('data/updateTextAreaValue')
  updateTextAreaValue!: DataActionDispatchers['updateTextAreaValue']

  /**
   * @listens textarea@input
   */
  handleInputTextArea(event: HTMLElementEvent<HTMLTextAreaElement>) {
    this.updateTextAreaValue(event.target.value)
  }
}
</script>

<style lang="sass" scoped>
@import '../assets/styles/configs'

.SectionTextArea
  .__textarea
    box-sizing: border-box
    padding: var(--spaceGap)
    border: 1px solid var(--colorBorder)
    border-radius: 4px
    width: 100%
    height: calc((2rem * 1.2) + (var(--spaceGap) * 2))
    min-height: calc((1em * 1.2) + (var(--spaceGap) * 2))
    font-family: 'Anonymous Pro', monospace
    font-size: 0.75rem
    line-height: 1.2
    vertical-align: top
    resize: vertical
</style>
