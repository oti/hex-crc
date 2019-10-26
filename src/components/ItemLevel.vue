<template>
  <div class="ItemLevel">
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
import { ColorSet } from '@/models/ColorSet'
import { Nullable } from '@/models/Nullable'
import { isStringOfNotEmpty } from '@/utilities/isString'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class ItemLevel extends Vue {
  /**
   * 入力プロパティを定義する
   */
  @Prop({ default: NaN }) ratio!: number
  @Prop({ default: true }) showsLabel!: boolean
  @Prop({ required: true }) value!: ColorSet

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

.ItemLevel
  position: relative

  .__label
    position: absolute
    top: 50%
    left: 0
    z-index: 1
    transform: translateY(calc((40px) * -1))
    margin: 0
    font-size: 0.5rem

  .__text
    margin: 0
    padding: 7px
    border-bottom: 1px solid var(--colorBorder)
    text-align: center
</style>
