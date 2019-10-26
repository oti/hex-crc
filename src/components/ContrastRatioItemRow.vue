<template>
  <div class="ContrastRow">
    <p class="VisuallyHidden">{{ itemTitle }}</p>
    <div class="__column __actions">
      <ItemActions
        :clearable="clearable"
        :removable="removable"
        @add="$emit('add')"
        @clear="$emit('clear')"
        @remove="$emit('remove')"
      />
    </div>

    <div class="__column __inputs">
      <div class="__flex">
        <ItemInputs
          :shows-label="label"
          :value="value.front"
          label-text="前景色"
          @input="handleInputColor('front', $event)"
        />
      </div>

      <div class="__flex">
        <ItemInputs
          :shows-label="label"
          :value="value.back"
          label-text="背景色"
          @input="handleInputColor('back', $event)"
        />
      </div>
    </div>

    <div class="__column __results">
      <div class="__flex __ratio">
        <ItemRatio :shows-label="label" :value="value" />
      </div>

      <div class="__flex __level">
        <p :class="['__label', { VisuallyHidden: !label }]">適合レベル</p>
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
import ItemActions from '@/components/ItemActions.vue'
import ItemInputs from '@/components/ItemInputs.vue'
import ItemRatio from '@/components/ItemRatio.vue'
import { ColorSet } from '@/models/ColorSet'
import { NullableString } from '@/models/NullableString'
import { isStringOfNotEmpty } from '@/utilities/isString'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  components: {
    ItemActions,
    ItemInputs,
    ItemRatio
  }
})
export default class ContrastRatioItemRow extends Vue {
  @Prop({ required: true }) itemTitle!: string
  @Prop({ default: true }) label!: boolean
  @Prop({ default: true }) removable!: boolean
  @Prop({ required: true }) value!: ColorSet

  get clearable() {
    const { front, back } = this.value
    return isStringOfNotEmpty(front) || isStringOfNotEmpty(back)
  }

  get level() {
    // const { contrastRetio } = this
    const contrastRetio = 10
    if (contrastRetio >= 7) {
      return 'AAA'
    } else if (contrastRetio >= 4.5) {
      return 'AA'
    } else {
      return 'Fail'
    }
  }

  /**
   * @listens ItemInputs.input
   * @param target
   * @param value
   */
  handleInputColor(target: 'front' | 'back', value: NullableString) {
    return (this.value[target] = value)
  }
}
</script>

<style lang="sass" scoped>
@import '../assets/styles/mixins'
@import '../assets/styles/placeholders'
@import '../assets/styles/utilities'

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
