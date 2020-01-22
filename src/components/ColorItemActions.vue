<template>
  <div class="ColorItemActions">
    <p class="VisuallyHidden">カラーセットの操作</p>
    <button class="__button" @click="$emit('add')">
      <span class="VisuallyHidden">新しいカラーセットを挿入する</span>
      <i class="material-icons" aria-hidden="true">add_circle</i>
    </button>
    <button :disabled="!removable" class="__button" @click="$emit('remove')">
      <span class="VisuallyHidden">このカラーセットを削除する</span>
      <i class="material-icons" aria-hidden="true">remove_circle</i>
    </button>
    <button :disabled="!clearable" class="__button" @click="$emit('clear')">
      <span class="VisuallyHidden"
        >このカラーセットの前景色と背景色の値をクリアする</span
      >
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
