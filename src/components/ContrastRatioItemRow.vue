<template>
  <div class="ContrastRow">
    <p class="-sr-only">{{ itemTitle }}</p>
    <div class="__column __actions">
      <p class="-sr-only">アイテムの操作</p>
      <button class="__button" @click="$emit('add')">
        <span class="-sr-only">次の行に新しいアイテムを挿入する</span>
        <i class="material-icons" aria-hidden="true">add_circle</i>
      </button>
      <button :disabled="!removable" class="__button" @click="$emit('remove')">
        <span class="-sr-only">この行を削除する</span>
        <i class="material-icons" aria-hidden="true">remove_circle</i>
      </button>
      <button :disabled="!clearable" class="__button" @click="$emit('clear')">
        <span class="-sr-only">この行の値をクリアする</span>
        <i class="material-icons" aria-hidden="true">format_color_reset</i>
      </button>
    </div>

    <div class="__column __inputs">
      <div class="__flex">
        <p :class="['__label', { '-sr-only': !label }]">前景色</p>
        <div class="__color">
          <input v-model="value.front" class="__input" type="text" />
          <input v-model="value.front" class="__preview" type="color" />
        </div>
      </div>

      <div class="__flex">
        <p :class="['__label', { '-sr-only': !label }]">背景色</p>
        <div class="__color">
          <input v-model="value.back" class="__input" type="text" />
          <input v-model="value.back" class="__preview" type="color" />
        </div>
      </div>
    </div>

    <div class="__column __results">
      <div class="__flex __ratio">
        <p :class="['__label', { '-sr-only': !label }]">コントラスト比</p>
        <p class="__text">{{ contrastRetio }}</p>
      </div>

      <div class="__flex __level">
        <p :class="['__label', { '-sr-only': !label }]">適合レベル</p>
        <p
          class="__text"
          :style="`color: ${value.front}; background-color: ${value.back}`"
        >
          {{ level }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ColorSet } from '@/models/ColorSet'
import { isStringOfNotEmpty } from '@/utilities/isString'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class ContrastRatioItemRow extends Vue {
  @Prop({ required: true }) itemTitle!: string
  @Prop({ default: true }) label!: boolean
  @Prop({ default: true }) removable!: boolean
  @Prop({ required: true }) value!: ColorSet

  get clearable() {
    const { front, back } = this.value
    return isStringOfNotEmpty(front) || isStringOfNotEmpty(back)
  }

  get contrastRetio() {
    const { front, back } = this.value
    return isStringOfNotEmpty(front) && isStringOfNotEmpty(back)
      ? Math.round(this.calcurateContrastRatio(front, back) * 1000) / 1000
      : ''
  }

  get level() {
    const { contrastRetio } = this
    if (contrastRetio > 7) {
      return 'AAA'
    } else if (contrastRetio > 4.5) {
      return 'AA'
    } else {
      return 'Fail'
    }
  }

  convertHexToRgb(hex: string) {
    const trimedHex = hex.charAt(0) == '#' ? hex.substring(1, 7) : hex

    return [
      Math.round(parseInt(trimedHex.substring(0, 2), 16)),
      Math.round(parseInt(trimedHex.substring(2, 4), 16)),
      Math.round(parseInt(trimedHex.substring(4, 6), 16))
    ]
  }

  // 0~1のsRGB値を返す
  convertToSrgbValue(valeu: number) {
    return valeu / 255
  }

  // 相対輝度計算に使うためのRGBを返す
  convertToLuminance(value: number) {
    if (value <= 0.03928) {
      return value / 12.92
    } else {
      return Math.pow((value + 0.055) / 1.055, 2.4)
    }
  }

  // 相対輝度を返す
  convertToRelativeLuminance(r: number, g: number, b: number) {
    let R = this.convertToLuminance(this.convertToSrgbValue(r))
    let G = this.convertToLuminance(this.convertToSrgbValue(g))
    let B = this.convertToLuminance(this.convertToSrgbValue(b))
    return 0.2126 * R + 0.7152 * G + 0.0722 * B
  }

  // コントラスト比を返す
  calcurateContrastRatio(front: string, back: string) {
    const rgb1 = this.convertHexToRgb(front)
    const rgb2 = this.convertHexToRgb(back)
    const L1 = this.convertToRelativeLuminance(rgb1[0], rgb1[1], rgb1[2])
    const L2 = this.convertToRelativeLuminance(rgb2[0], rgb2[1], rgb2[2])
    const bright = L1 > L2 ? L1 : L2 // 明るい方の相対輝度
    const dark = L1 < L2 ? L1 : L2 // 暗い方の相対輝度
    return (bright + 0.05) / (dark + 0.05)
  }
}
</script>

<style lang="sass" scoped>
@import '../assets/styles/mixins'
@import '../assets/styles/placeholders'

.-sr-only
  @extend %visuallyHidden

.ContrastRow
  display: flex
  justify-content: center
  align-items: center
  margin: auto
  width: auto
  line-height: 1

  + .ContrastRow
    margin-top: var(--spaceGap)

  .__column
    flex-shrink: 1
    + .__column
      @include min()
        margin-left: var(--spaceGap)

  .__flex
    position: relative
    @include min()
      min-width: 100px
    + .__flex
      @include min()
        margin-left: var(--spaceGap)

  .__label
    position: absolute
    top: 50%
    left: 0
    z-index: 1
    transform: translateY(calc((40px) * -1))
    margin: 0
    font-size: 0.5rem

  .__actions
    @include max()
      width: 1rem
    .__button
      @extend %resetButton
      height: 1rem
      line-height: 1
      &:disabled
        opacity: 0.5

  .__inputs
    @include min()
      display: flex
    .__color
      position: relative
      border: 1px solid var(--colorBorder)
      border-radius: 3px
      background-color: #fff
      .__input
        padding: 5px var(--spaceGap)
        border: none
        width: 5em
        font-size: inherit
        background-color: transparent
      .__preview
        @extend %resetButton
        position: absolute
        top: 0
        right: 0
        border-left: 1px solid var(--colorBorder)
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
          border-radius: 0 2px 2px 0
        &::-webkit-color-swatch
          width: 100%
          height: 100%
          border: none
          border-radius: 0 2px 2px 0
        &::-moz-focus-inner
          border: none
          padding: 0

  .__results
    @include min()
      display: flex

    .__ratio

    .__level
      .__text
        text-align: center

  .__text
    margin: 0
</style>
