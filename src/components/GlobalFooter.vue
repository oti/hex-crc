<template>
  <footer class="GlobalFooter">
    <p class="__lisence">MIT Lisence.</p>
    <p class="__credit">
      made by oti [<a href="https://twitter.com/otiext">Twitter</a>][<a
        href="https://github.com/oti/hex-crc/"
        >GitHub</a
      >]
    </p>
    <address class="__address">otiext@gmail.com</address>
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
  padding: 0.25rem
  color: var(--colorBg)
  font-size: 0.65rem
  line-height: 1.2
  background-color: var(--colorText)
  @include max()
    flex-direction: column

  .__credit
    margin-right: 1rem
    margin-left: 1rem
    a:link,
    a:visited,
    a:hover,
    a:focus,
    a:active
      color: var(--colorLink)
</style>
