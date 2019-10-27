<template>
  <footer class="GlobalFooter">
    <div class="__inner">
      <p class="__credit">
        Made by oti [ <a href="https://twitter.com/otiext">Twitter</a> /
        <a href="https://github.com/oti/hex-crc/">GitHub</a> ]
      </p>
      <p class="__lisence">MIT Lisence.</p>
    </div>
  </footer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class GlobalFooter extends Vue {}
</script>

<style lang="sass" scoped>
@import '../assets/styles/configs'

.GlobalFooter
  color: var(--colorBg)
  font-size: 0.6rem
  line-height: 1.2
  background-color: var(--colorText)
  @include min()
    font-size: 0.75rem

  .__inner
    box-sizing: border-box
    display: flex
    justify-content: space-between
    align-items: center
    margin: auto
    padding: 0.5rem
    max-width: 580px

  .__credit
    margin: 0
    a:link,
    a:visited,
    a:hover,
    a:focus,
    a:active
      color: var(--colorLink)

  .__lisence
    margin: 0
</style>
