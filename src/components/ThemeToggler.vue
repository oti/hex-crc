<template>
  <div class="ThemeToggler" @change="toggleDarkMode">
    <p class="VisuallyHidden">ページの表示モードを切り替える</p>
    <div class="__item">
      <input
        id="ThemeTogglerLight"
        :checked="!data.darkMode"
        class="__input"
        name="darkMode"
        type="radio"
      />
      <label class="__label" for="ThemeTogglerLight">
        ライトモード
      </label>
    </div>
    <div class="__item">
      <input
        id="ThemeTogglerDark"
        :checked="data.darkMode"
        class="__input"
        name="darkMode"
        type="radio"
      />
      <label class="__label" for="ThemeTogglerDark">
        ダークモード
      </label>
    </div>
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
