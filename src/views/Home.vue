<template>
  <div class="Home">
    <GlobalHeader />
    <main class="__content" role="main">
      <SectionIntro class="__intro" />

      <SectionTextArea v-if="ui.showsTextArea" class="__textarea" />

      <section class="__list">
        <h2 class="__heading">カラーセット</h2>
        <ContrastRatioItemRow
          v-for="(item, i) in data.colorItems"
          :key="i"
          :label="i === 0"
          :item-title="itemTitle(i)"
          :removable="data.colorItems.length > 1"
          :value="item"
          @add="addColorItem(i)"
          @clear="clearColorItem(i)"
          @remove="removeColorItem(i)"
        />
      </section>
    </main>
    <GlobalFooter />
  </div>
</template>

<script lang="ts">
import ContrastRatioItemRow from '@/components/ContrastRatioItemRow.vue'
import GlobalFooter from '@/components/GlobalFooter.vue'
import GlobalHeader from '@/components/GlobalHeader.vue'
import SectionIntro from '@/components/SectionIntro.vue'
import SectionTextArea from '@/components/SectionTextArea.vue'
import {
  DataActionDispatchers,
  DataViewModel
} from '@/store/modules/data/models'
import { UiActionDispatchers, UiViewModel } from '@/store/modules/ui/models'
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'

@Component({
  components: {
    ContrastRatioItemRow,
    GlobalFooter,
    GlobalHeader,
    SectionIntro,
    SectionTextArea
  }
})
export default class Home extends Vue {
  // viewModel を引き当てる
  @Getter('data/viewModel') data!: DataViewModel
  @Getter('ui/viewModel') ui!: UiViewModel

  /**
   * アクションを引き当てる
   */
  @Action('data/addColorItem')
  addColorItem!: DataActionDispatchers['addColorItem']
  @Action('data/clearColorItem')
  clearColorItem!: DataActionDispatchers['clearColorItem']
  @Action('data/removeColorItem')
  removeColorItem!: DataActionDispatchers['removeColorItem']

  /**
   * @method - カラーセットアイテムのタイトルを返す
   * @param i
   */
  itemTitle(i: number) {
    return `カラーセット${i + 1}`
  }
}
</script>

<style lang="sass" scoped>
@import '../assets/styles/configs'
.Home
  .__content
    margin: 2rem auto
    padding-right: calc(var(--spaceGap) * 2)
    padding-left: calc(var(--spaceGap) * 2)
    max-width: calc(var(--spaceGap) * 4 + 600px)
    font-size: 0.7rem

  .__heading
    margin: 0
    font-size: 1rem

  .__intro
    margin-top: calc(var(--spaceGap) * 4)

  .__textarea
    margin-top: calc(var(--spaceGap) * 1.5)

  .__list
    margin-top: calc(var(--spaceGap) * 4)
    font-size: 1rem
</style>
