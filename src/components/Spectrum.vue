<template>
  <div class="Spectrum" />
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Spectrum extends Vue {}
</script>

<style lang="sass">
.Spectrum
  height: 2px
  background-image: linear-gradient(to left, red, yellow, lime, cyan, blue, magenta)
</style>
