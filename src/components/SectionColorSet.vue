<template>
  <section class="SectionColorSet">
    <h2 class="SectionHeading">カラーセット</h2>
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
</template>

<script lang="ts">
import ContrastRatioItemRow from '@/components/ContrastRatioItemRow.vue'
import {
  DataActionDispatchers,
  DataViewModel
} from '@/store/modules/data/models'
import { Component, Vue } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'

@Component({
  components: {
    ContrastRatioItemRow
  }
})
export default class SectionColorSet extends Vue {
  /**
   * viewModel を引き当てる
   */
  @Getter('data/viewModel') data!: DataViewModel

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

<style lang="sass" scoped></style>
