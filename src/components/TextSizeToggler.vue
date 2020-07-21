<template>
  <div class="TextSizeToggler">
    <input
      id="TextSizeTogglerInput"
      v-model="ui.largeText"
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
import { UiActionDispatchers, UiViewModel } from "@/store/modules/ui/models";
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";

@Component
export default class TextSizeToggler extends Vue {
  // viewModel を引き当てる
  @Getter("ui/viewModel") ui!: UiViewModel;

  /**
   * アクションを引き当てる
   */
  @Action("ui/toggleTextSize")
  toggleTextSize!: UiActionDispatchers["toggleTextSize"];
}
</script>
