<template>
  <div>
    <Header />

    <Main />

    <Footer />
  </div>
</template>

<script lang="ts">
import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'
import Main from '@/components/Main.vue'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {
    Footer,
    Header,
    Main
  }
})
export default class Home extends Vue {}
</script>

<style lang="sass" scoped></style>
