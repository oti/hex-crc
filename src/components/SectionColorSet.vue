<template>
  <section class="SectionColorSet">
    <TextSizeToggler />
    <h2 class="SectionHeading">カラーセット</h2>
    <ColorItemRow
      v-for="(item, i) in data.colorItems"
      :key="i"
      :item-title="itemTitle(i)"
      :removable="data.colorItems.length > 1"
      :shows-label="i === 0"
      :value="item"
      @add="addColorItem(i)"
      @clear="clearColorItem(i)"
      @remove="removeColorItem(i)"
      @input:front="
        updateColor({
          target: 'front',
          color: $event,
          index: i,
        })
      "
      @input:back="
        updateColor({
          target: 'back',
          color: $event,
          index: i,
        })
      "
    />
  </section>
</template>

<script lang="ts">
import ColorItemRow from "@/components/ColorItemRow.vue";
import TextSizeToggler from "@/components/TextSizeToggler.vue";
import { DataAction, DataViewModel } from "@/store/modules/data/models";
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";

@Component({
  components: {
    ColorItemRow,
    TextSizeToggler,
  },
})
export default class SectionColorSet extends Vue {
  /**
   * viewModel を引き当てる
   */
  @Getter("data/viewModel") data!: DataViewModel;

  /**
   * アクションを引き当てる
   */
  @Action("data/addColorItem")
  addColorItem!: DataAction["addColorItem"];
  @Action("data/clearColorItem")
  clearColorItem!: DataAction["clearColorItem"];
  @Action("data/removeColorItem")
  removeColorItem!: DataAction["removeColorItem"];
  @Action("data/updateColor")
  updateColor!: DataAction["updateColor"];

  /**
   * @method - カラーセットアイテムのタイトルを返す
   * @param i
   */
  itemTitle(i: number) {
    return `カラーセット${i + 1}`;
  }
}
</script>
