<template>
  <div class="Home">
    <GlobalHeader />
  </div>
</template>

<script lang="ts">
import GlobalHeader from '@/components/GlobalHeader.vue'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  components: {
    GlobalHeader
  }
})
export default class Home extends Vue {}
</script>
