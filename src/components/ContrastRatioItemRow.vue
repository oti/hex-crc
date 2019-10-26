<template>
  <div class="ContrastRow">
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
        class="__cellInner"
        :shows-label="label"
        :value="value.front"
        label-text="前景色"
        @input="handleInputColor('front', $event)"
      />

      <ItemInputs
        class="__cellInner"
        :shows-label="label"
        :value="value.back"
        label-text="背景色"
        @input="handleInputColor('back', $event)"
      />
    </div>

    <div class="__cell">
      <ItemRatio
        class="__cellInner"
        :shows-label="label"
        :value="value"
        @calc="handleCalcRatio"
      />

      <ItemLevel
        class="__cellInner"
        :ratio="ratio"
        :shows-label="label"
        :value="value"
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
    return isStringOfNotEmpty(front) || isStringOfNotEmpty(back)
  }

  /**
   * @listens ItemInputs.input
   * @param target
   * @param value
   */
  handleInputColor(target: 'front' | 'back', value: NullableString) {
    return (this.value[target] = value)
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

  .__cell
    flex-shrink: 1
    @include min()
      display: flex
    + .__cell
      @include min()
        margin-left: var(--spaceGap)

  .__cellInner
    @include min()
      min-width: 100px
    + .__cellInner
      @include min()
        margin-left: var(--spaceGap)
</style>
