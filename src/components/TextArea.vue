<template>
  <textarea class="TextArea" :value="value" @input="handleInputTextArea" />
</template>

<script lang="ts">
import { ColorSet } from '@/models/ColorSet'
import { Nullable } from '@/models/Nullable'
import { isStringOfNotEmpty } from '@/utilities/isString'
import { Component, Prop, Vue } from 'vue-property-decorator'
/**
 * @sees https://qiita.com/wamei/items/43753e03821964719f31
 */
interface HTMLElementEvent<T extends HTMLElement> extends Event {
  target: T
}

@Component
export default class TextArea extends Vue {
  /**
   * 入力プロパティを定義する
   */
  @Prop({ required: true }) value!: string

  /**
   * @listens textarea@input
   */
  handleInputTextArea(event: HTMLElementEvent<HTMLTextAreaElement>) {
    this.$emit('input', event.target.value)
  }
}
</script>

<style lang="sass" scoped>
@import '../assets/styles/configs'

.TextArea
  box-sizing: border-box
  padding: var(--spaceGap)
  border: 1px solid var(--colorBorder)
  border-radius: 4px
  width: 100%
  height: calc((2rem * 1.2) + (var(--spaceGap) * 2))
  min-height: calc((1em * 1.2) + (var(--spaceGap) * 2))
  font-size: 0.75rem
  line-height: 1.2
  vertical-align: top
  resize: vertical
</style>
