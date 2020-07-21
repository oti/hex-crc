<template>
  <div>
    <Spectrum />

    <Header />

    <Main />

    <ColorPreview />

    <Footer />

    <Spectrum />
  </div>
</template>

<script lang="ts">
import ColorPreview from "@/components/ColorPreview.vue";
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";
import Main from "@/components/Main.vue";
import Spectrum from "@/components/Spectrum.vue";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    ColorPreview,
    Footer,
    Header,
    Main,
    Spectrum,
  },
})
export default class Home extends Vue {}
</script>
