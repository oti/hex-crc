<template>
  <div class="ColorPreview">
    <div
      v-for="(color, i) in data.colorItems"
      :key="`${i}-${color.front}-${color.back}`"
      :style="`background-color: ${color.back}`"
      class="__back"
    >
      <div :style="`background-color: ${color.front}`" class="__front"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { DataViewModel } from "@/store/modules/data/models";
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";

@Component({})
export default class ColorPreview extends Vue {
  /**
   * viewModel を引き当てる
   */
  @Getter("data/viewModel") data!: DataViewModel;
}
</script>
