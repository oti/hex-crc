<template>
  <div class="ColorItemActions">
    <p class="VisuallyHidden">アイテムの操作</p>
    <button class="__button" @click="$emit('add')">
      <span class="VisuallyHidden">次の行に新しいアイテムを挿入する</span>
      <i class="material-icons" aria-hidden="true">add_circle</i>
    </button>
    <button :disabled="!removable" class="__button" @click="$emit('remove')">
      <span class="VisuallyHidden">この行を削除する</span>
      <i class="material-icons" aria-hidden="true">remove_circle</i>
    </button>
    <button :disabled="!clearable" class="__button" @click="$emit('clear')">
      <span class="VisuallyHidden">この行の値をクリアする</span>
      <i class="material-icons" aria-hidden="true">format_color_reset</i>
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class ColorItemActions extends Vue {
  /**
   * 入力プロパティを定義する
   */
  @Prop({ default: true }) clearable!: boolean
  @Prop({ default: true }) removable!: boolean
}
</script>

<style lang="sass" scoped>
@import '../assets/styles/configs'

.ColorItemActions
  @include max()
    width: 1rem
  @include min()
    height: 1rem

  .__button
    @extend %resetButton
    height: 1rem
    line-height: 1
    &:disabled
      opacity: 0.5
</style>
