<template>
  <header class="Header">
    <h1 class="__heading">HEX Contrast Ratio Calcurator</h1>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Header extends Vue {}
</script>

<style lang="sass" scoped>
@import '../assets/styles/configs'

.Header
  display: flex
  justify-content: center
  align-items: center
  color: var(--colorBg)
  background-color: var(--colorText)
  @include max()
    padding: 0.75rem
  @include min()
    padding-top: 1rem
    padding-bottom: 1rem

  .__heading
    margin: 0
    line-height: 1.2
    @include max()
      font-size: 0.9rem
    @include min()
      font-size: 1.4rem
</style>
