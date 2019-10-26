<template>
  <div class="ItemInputs">
    <p :class="['__label', { VisuallyHidden: !showsLabel }]">{{ labelText }}</p>
    <div class="__inputs">
      <input
        :value="value"
        class="__typeText"
        type="text"
        @input="handleInputColor"
      />
      <input
        :value="value"
        class="__typeColor"
        type="color"
        @input="handleInputColor"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { NullableString } from '@/models/NullableString'
import { Component, Prop, Vue } from 'vue-property-decorator'

/**
 * @sees https://qiita.com/wamei/items/43753e03821964719f31
 */
interface HTMLElementEvent<T extends HTMLElement> extends Event {
  target: T
}

@Component
export default class ItemInputs extends Vue {
  /**
   * 入力プロパティを定義する
   */
  @Prop({ default: '' }) labelText!: string
  @Prop({ default: true }) showsLabel!: boolean
  @Prop({ required: true }) value!: NullableString

  /**
   * @listens input[type="text"][type="color"]@input
   */
  handleInputColor(event: HTMLElementEvent<HTMLInputElement>) {
    this.$emit('input', event.target.value)
  }
}
</script>

<style lang="sass" scoped>
@import '../assets/styles/configs'

.ItemInputs
  position: relative
  @include min()
    display: flex

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

  .__inputs
    position: relative
    border: 1px solid var(--colorBorder)
    border-radius: 3px
    background-color: #fff
    .__typeText
      margin: 0
      padding: 5px var(--spaceGap)
      border: none
      width: 5em
      font-size: inherit
      background-color: transparent
    .__typeColor
      @extend %resetButton
      position: absolute
      top: 0
      right: 0
      margin: 0
      width: 0.5rem
      height: 100%
      &::-moz-color-swatch-wrapper
        padding: 0
      &::-webkit-color-swatch-wrapper
        padding: 0
      &::-moz-color-swatch
        width: 100%
        height: 100%
        border: none
        border-left: 1px solid var(--colorBorder)
        border-radius: 0 2px 2px 0
      &::-webkit-color-swatch
        width: 100%
        height: 100%
        border: none
        border-left: 1px solid var(--colorBorder)
        border-radius: 0 2px 2px 0
      &::-moz-focus-inner
        border: none
        padding: 0
</style>
