<template>
  <div class="ColorItemLevel">
    <p :class="['__label', { VisuallyHidden: !showsLabel }]">WCAG2.1達成</p>
    <p
      class="__text"
      :style="`color: ${value.front}; background-color: ${value.back}`"
    >
      {{ result }}
    </p>
  </div>
</template>

<script lang="ts">
import { ColorItem } from '@/models/ColorItem'
import { Result } from '@/models/Result'
import { UiViewModel } from '@/store/modules/ui/models'
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@Component
export default class ColorItemLevel extends Vue {
  /**
   * viewModel を引き当てる
   */
  @Getter('ui/viewModel') ui!: UiViewModel

  /**
   * 入力プロパティを定義する
   */
  @Prop({ default: NaN }) ratio!: number
  @Prop({ default: true }) showsLabel!: boolean
  @Prop({ required: true }) value!: ColorItem

  /**
   * @get - WCAG2.1において達成している結果を返す
   */
  get result() {
    const { ratio, ui } = this
    const AAA: number = ui.largeText ? 4.5 : 7
    const AA: number = ui.largeText ? 3 : 4.5
    let result: Result = 'Fail'

    if (ratio >= 3) {
      result = 'Not Bad'
    }
    if (ratio >= AA) {
      result = 'AA'
    }
    if (ratio >= AAA) {
      result = 'AAA'
    }

    return result
  }
}
</script>

<style lang="sass" scoped>
@import '../assets/styles/configs'

.ColorItemLevel
  position: relative

  .__label
    position: absolute
    top: 50%
    left: 2px
    z-index: 1
    margin: 0
    font-size: 0.5rem
    @include max()
      transform: translateY(-36px)
    @include min()
      transform: translateY(-40px)

  .__text
    margin: 0
    padding-top: 8px
    padding-bottom: 7px
    border-bottom: 1px solid var(--colorBorder)
    text-align: center
</style>
