<template>
  <section class="SectionTextArea">
    <p>
      ※オブジェクトの<code>key</code>と<code>value</code>はダブルクォーテーションで囲ってください。
    </p>

    <textarea
      class="__textarea"
      :value="data.string"
      @input="handleInputTextArea"
    />

    <div class="__action">
      <button class="Button" type="button" @click="convertStringToColorItems">
        <i class="material-icons" aria-hidden="true">get_app</i>
        <span>JSONからカラーセットに変換</span>
      </button>
      <button class="Button" type="button" @click="convertColorItemsToString">
        <i class="material-icons" aria-hidden="true">publish</i>
        <span>カラーセットからJSONに変換</span>
      </button>
    </div>
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
  @Action('data/convertStringToColorItems')
  convertStringToColorItems!: DataActionDispatchers['convertStringToColorItems']
  @Action('data/convertColorItemsToString')
  convertColorItemsToString!: DataActionDispatchers['convertColorItemsToString']
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

  .__action
    margin-top: calc(var(--spaceGap) * 1.5)
    text-align: center
    .Button
      margin: 0 calc(var(--spaceGap) / 2) calc(var(--spaceGap) * 1)
</style>
