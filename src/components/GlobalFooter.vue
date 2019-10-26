<template>
  <footer class="GlobalFooter">
    <p class="__credit">
      Made by oti [<a href="https://twitter.com/otiext">Twitter</a>][<a
        href="https://github.com/oti/hex-crc/"
        >GitHub</a
      >]
    </p>
    <p class="__lisence">MIT Lisence.</p>
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
  display: flex
  justify-content: center
  align-items: center
  color: var(--colorBg)
  padding: 1rem
  font-size: 1rem
  line-height: 1.2
  background-color: var(--colorText)
  @include max()
    padding: 0.5rem
    font-size: 0.5rem

  .__credit
    margin: 0.5rem
    a:link,
    a:visited,
    a:hover,
    a:focus,
    a:active
      color: var(--colorLink)

  .__lisence
    margin: 0 0 0 1rem
</style>
