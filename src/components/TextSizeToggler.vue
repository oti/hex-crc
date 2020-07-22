<template>
  <div class="TextSizeToggler">
    <input
      id="TextSizeTogglerInput"
      v-model="data.largeText"
      class="__input"
      type="checkbox"
      name="darkMode"
      @change="toggleTextSize"
    />
    <label class="__label" for="TextSizeTogglerInput">
      大きなテキスト
    </label>
  </div>
</template>

<script lang="ts">
import { DataAction, DataViewModel } from "@/store/modules/data/models";
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";

@Component
export default class TextSizeToggler extends Vue {
  // viewModel を引き当てる
  @Getter("data/viewModel") data!: DataViewModel;

  /**
   * アクションを引き当てる
   */
  @Action("data/toggleTextSize")
  toggleTextSize!: DataAction["toggleTextSize"];
}
</script>
