<template>
  <main class="Main" role="main">
    <SectionIntro />

    <SectionTextArea class="__textarea" />

    <SectionColorSet class="__set" />
  </main>
</template>

<script lang="ts">
import SectionColorSet from "@/components/SectionColorSet.vue";
import SectionIntro from "@/components/SectionIntro.vue";
import SectionTextArea from "@/components/SectionTextArea.vue";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    SectionColorSet,
    SectionIntro,
    SectionTextArea,
  },
})
export default class Main extends Vue {}
</script>
