<template>
  <header class="GlobalHeader">
    <h1 class="__heading">HEX Contrast Ratio Calcurator</h1>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class GlobalHeader extends Vue {}
</script>

<style lang="sass" scoped>
@import '../assets/styles/configs'

.GlobalHeader
  display: flex
  justify-content: center
  align-items: center
  color: var(--colorBg)
  background-color: var(--colorText)
  @include max()
    padding: 0.75rem 0.5rem
  @include min()
    padding: 1rem 0.5rem

  .__heading
    margin: 0
    line-height: 1.2
    @include max()
      font-size: 1rem
    @include min()
      font-size: 1.4rem
</style>
