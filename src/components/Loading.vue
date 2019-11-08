<template>
  <div class="Loading">
    <div class="__inner">
      <div class="__charm" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Loading extends Vue {}
</script>

<style lang="sass" scoped>

.Loading
  position: fixed
  top: 0
  bottom: 0
  left: 0
  right: 0
  z-index: 1
  background-color: #f4f5f4

  .__inner
    position: absolute
    top: 0
    bottom: 0
    left: 0
    right: 0
    display: flex
    justify-content: center
    align-items: center
</style>
