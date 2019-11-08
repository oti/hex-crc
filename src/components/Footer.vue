<template>
  <footer class="Footer">
    <div class="__inner">
      <p class="__credit">
        このウェブアプリは<a
          href="https://twitter.com/otiext"
          target="_blank"
          rel="noopener"
          >越智</a
        >が作りました。
      </p>
      <p class="__license">
        <a href="https://github.com/oti/hex-crc/" target="_blank" rel="noopener"
          >GitHub</a
        >, MIT License.
      </p>
    </div>
  </footer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Footer extends Vue {}
</script>

<style lang="sass" scoped>
@import '../assets/styles/configs'

.Footer
  color: var(--colorBg)
  font-size: 0.6rem
  line-height: 1.2
  background-color: var(--colorText)

  .__inner
    box-sizing: border-box
    display: flex
    justify-content: space-between
    align-items: center
    margin: auto
    padding: 0.5rem
    max-width: 680px

  .__credit
    margin: 0
    a:link,
    a:visited,
    a:hover,
    a:focus,
    a:active
      color: var(--colorLink)

  .__license
    margin: 0
    a:link,
    a:visited,
    a:hover,
    a:focus,
    a:active
      color: var(--colorLink)
</style>
