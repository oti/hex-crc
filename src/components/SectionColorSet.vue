<template>
  <section class="SectionColorSet">
    <TextSizeToggler />
    <h2 class="SectionHeading">カラーセット</h2>
    <ColorItemRow
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
import ColorItemRow from '@/components/ColorItemRow.vue'
import TextSizeToggler from '@/components/TextSizeToggler.vue'
import {
  DataActionDispatchers,
  DataViewModel
} from '@/store/modules/data/models'
import { Component, Vue } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'

@Component({
  components: {
    ColorItemRow,
    TextSizeToggler
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
