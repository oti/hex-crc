<template>
  <div class="ColorItemLevel">
    <p :class="['__label', { VisuallyHidden: !showsLabel }]">WCAG2.0達成</p>
    <p
      class="__text"
      :style="`color: ${value.front}; background-color: ${value.back}`"
    >
      {{ level }}
    </p>
  </div>
</template>

<script lang="ts">
import { ColorItem } from '@/models/ColorItem'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class ColorItemLevel extends Vue {
  /**
   * 入力プロパティを定義する
   */
  @Prop({ default: NaN }) ratio!: number
  @Prop({ default: true }) showsLabel!: boolean
  @Prop({ required: true }) value!: ColorItem

  /**
   * @get - WCAG2.0において達成しているレベルを返す
   */
  get level() {
    const { ratio } = this
    if (ratio >= 7) {
      return 'AAA'
    } else if (ratio >= 4.5) {
      return 'AA'
    } else {
      return 'Fail'
    }
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
