<template>
  <div class="ColorItemRow">
    <p class="VisuallyHidden">{{ itemTitle }}</p>
    <div class="__cell">
      <ColorItemActions
        :clearable="clearable"
        :removable="removable"
        @add="$emit('add')"
        @clear="$emit('clear')"
        @remove="$emit('remove')"
      />
    </div>

    <div class="__cell">
      <ColorItemInputs
        :shows-label="label"
        :value="value.front"
        :label="inputFrontLabel"
        class="__cellInner"
        @input="handleInputFrontColor"
      />

      <ColorItemInputs
        :shows-label="label"
        :value="value.back"
        :label="inputBackLabel"
        :class="['__cellInner', { '-no-label': !label }]"
        @input="handleInputBackColor"
      />
    </div>

    <div class="__cell">
      <ColorItemRatio
        :shows-label="label"
        :value="value"
        class="__cellInner"
        @calc="handleCalcRatio"
      />

      <ColorItemLevel
        :ratio="ratio"
        :shows-label="label"
        :value="value"
        :class="['__cellInner', { '-no-label': !label }]"
      />
    </div>
  </div>
</template>

<script lang="ts">
import ColorItemActions from '@/components/ColorItemActions.vue'
import ColorItemInputs from '@/components/ColorItemInputs.vue'
import ColorItemLevel from '@/components/ColorItemLevel.vue'
import ColorItemRatio from '@/components/ColorItemRatio.vue'
import { ColorItem } from '@/models/ColorItem'
import { isStringOfNotEmpty } from '@/utilities/isString'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  components: {
    ColorItemActions,
    ColorItemInputs,
    ColorItemLevel,
    ColorItemRatio
  }
})
export default class ColorItemRow extends Vue {
  @Prop({ required: true }) itemTitle!: string
  @Prop({ default: true }) label!: boolean
  @Prop({ default: true }) removable!: boolean
  @Prop({ required: true }) value!: ColorItem

  ratio: number = NaN
  inputFrontLabel: string = '前景色'
  inputBackLabel: string = '背景色'

  get clearable() {
    const { front, back } = this.value
    return [front, back].some(isStringOfNotEmpty)
  }

  /**
   * @listens ColorItemInputs(front)@input
   * @param color
   */
  handleInputFrontColor(color: string) {
    this.value.front = color
  }

  /**
   * @listens ColorItemInputs(back)@input
   * @param color
   */
  handleInputBackColor(color: string) {
    this.value.back = color
  }

  /**
   * @listens ColorItemRatio@calc
   * @param ratio
   */
  handleCalcRatio(ratio: number) {
    this.ratio = ratio
  }
}
</script>
