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
  padding: 1.25rem
  color: var(--colorBg)
  background-color: var(--colorText)

  .__heading
    margin: 0
    font-size: 1.6rem
    line-height: 1.2
</style>
