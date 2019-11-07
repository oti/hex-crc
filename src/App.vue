<template>
  <VApp :class="[{ '-dark': ui.darkMode }]">
    <RouterView />
    <Loading v-if="ui.hasGlobalLoadingQueue" />
  </VApp>
</template>

<script lang="ts">
import Loading from '@/components/Loading.vue'
import { UiActionDispatchers, UiViewModel } from '@/store/modules/ui/models'
import { Component, Vue } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'

@Component({
  components: {
    Loading
  }
})
export default class App extends Vue {
  // viewModel を引き当てる
  @Getter('ui/viewModel') ui!: UiViewModel

  /**
   * アクションを引き当てる
   */
  @Action('ui/decrementGlobalLoadingQueue')
  decrementGlobalLoadingQueue!: UiActionDispatchers['decrementGlobalLoadingQueue']
  @Action('ui/incrementGlobalLoadingQueue')
  incrementGlobalLoadingQueue!: UiActionDispatchers['incrementGlobalLoadingQueue']

  /**
   * @lifecycles
   */
  created() {}
}
</script>
