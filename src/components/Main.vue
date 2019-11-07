<template>
  <main class="Main" role="main">
    <SectionIntro class="__intro" />

    <SectionTextArea v-if="ui.showsTextArea" class="__textarea" />

    <SectionColorSet class="__set" />
  </main>
</template>

<script lang="ts">
import SectionColorSet from '@/components/SectionColorSet.vue'
import SectionIntro from '@/components/SectionIntro.vue'
import SectionTextArea from '@/components/SectionTextArea.vue'
import { UiViewModel } from '@/store/modules/ui/models'
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@Component({
  components: {
    SectionColorSet,
    SectionIntro,
    SectionTextArea
  }
})
export default class Main extends Vue {
  /**
   * viewModel を引き当てる
   */
  @Getter('ui/viewModel') ui!: UiViewModel
}
</script>

<style lang="sass" scoped>
@import '../assets/styles/configs'
.Main
  margin: 2rem auto
  padding-right: calc(var(--spaceGap) * 2)
  padding-left: calc(var(--spaceGap) * 2)
  max-width: calc(var(--spaceGap) * 4 + 600px)
  font-size: 0.7rem

  .__intro
    margin-top: calc(var(--spaceGap) * 4)

  .__textarea
    margin-top: calc(var(--spaceGap) * 1.5)

  .__set
    margin-top: calc(var(--spaceGap) * 4)
    font-size: 1rem
</style>
