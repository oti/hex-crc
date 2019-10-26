<template>
  <div class="ContrastRatioItemRow">
    <p class="VisuallyHidden">{{ itemTitle }}</p>
    <div class="__cell">
      <ItemActions
        :clearable="clearable"
        :removable="removable"
        @add="$emit('add')"
        @clear="$emit('clear')"
        @remove="$emit('remove')"
      />
    </div>

    <div class="__cell">
      <ItemInputs
        :shows-label="label"
        :value="value.front"
        label-text="前景色"
        class="__cellInner"
        @input="handleInputFrontColor"
      />

      <ItemInputs
        :shows-label="label"
        :value="value.back"
        label-text="背景色"
        :class="['__cellInner', { '-no-label': !label }]"
        @input="handleInputBackColor"
      />
    </div>

    <div class="__cell">
      <ItemRatio
        :shows-label="label"
        :value="value"
        class="__cellInner"
        @calc="handleCalcRatio"
      />

      <ItemLevel
        :ratio="ratio"
        :shows-label="label"
        :value="value"
        :class="['__cellInner', { '-no-label': !label }]"
      />
    </div>
  </div>
</template>

<script lang="ts">
import ItemActions from '@/components/ItemActions.vue'
import ItemInputs from '@/components/ItemInputs.vue'
import ItemLevel from '@/components/ItemLevel.vue'
import ItemRatio from '@/components/ItemRatio.vue'
import { ColorSet } from '@/models/ColorSet'
import { NullableString } from '@/models/NullableString'
import { isStringOfNotEmpty } from '@/utilities/isString'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  components: {
    ItemActions,
    ItemInputs,
    ItemLevel,
    ItemRatio
  }
})
export default class ContrastRatioItemRow extends Vue {
  @Prop({ required: true }) itemTitle!: string
  @Prop({ default: true }) label!: boolean
  @Prop({ default: true }) removable!: boolean
  @Prop({ required: true }) value!: ColorSet

  ratio: number = NaN

  get clearable() {
    const { front, back } = this.value
    return [front, back].some(isStringOfNotEmpty)
  }

  /**
   * @listens ItemInputs(front).input
   * @param color
   */
  handleInputFrontColor(color: NullableString) {
    this.value.front = color
  }

  /**
   * @listens ItemInputs(back).input
   * @param color
   */
  handleInputBackColor(color: NullableString) {
    this.value.back = color
  }

  /**
   * @listens ItemRatio.calc
   * @param ratio
   */
  handleCalcRatio(ratio: number) {
    this.ratio = ratio
  }
}
</script>

<style lang="sass" scoped>
@import '../assets/styles/configs'

.ContrastRatioItemRow
  display: flex
  justify-content: center
  align-items: center
  margin: auto
  width: auto
  line-height: 1

  + .ContrastRatioItemRow
    @include max()
      margin-top: calc(var(--spaceGap) * 2.5)
    @include min()
      margin-top: var(--spaceGap)

  .__cell
    flex-shrink: 1
    @include min()
      display: flex
    + .__cell
      margin-left: var(--spaceGap)

  .__cellInner
    min-width: 100px
    + .__cellInner
      @include max()
        margin-top: calc(var(--spaceGap) * 2.5)
        &.-no-label
          margin-top: calc(var(--spaceGap) / 2)
      @include min()
        margin-left: var(--spaceGap)
</style>
