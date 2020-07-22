<template>
  <div class="ThemeToggler">
    <input
      id="ThemeTogglerInput"
      v-model="data.darkMode"
      class="__input"
      type="checkbox"
      name="darkMode"
      @change="toggleDarkMode"
    />
    <label class="__label" for="ThemeTogglerInput">
      ダークモードにする
    </label>
  </div>
</template>

<script lang="ts">
import { DataAction, DataViewModel } from "@/store/modules/data/models";
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";

@Component
export default class ThemeToggler extends Vue {
  // viewModel を引き当てる
  @Getter("data/viewModel") data!: DataViewModel;

  /**
   * アクションを引き当てる
   */
  @Action("data/toggleDarkMode")
  toggleDarkMode!: DataAction["toggleDarkMode"];
}
</script>
