<template>
  <div class="TextSizeToggler" @change="toggleTextSize">
    <p class="VisuallyHidden">判定するテキストのサイズを切り替える</p>
    <div class="__item">
      <input
        id="TextSizeTogglerBase"
        :checked="!data.largeText"
        class="__input"
        name="textSize"
        type="radio"
      />
      <label class="__label" for="TextSizeTogglerBase">
        通常サイズのテキスト
      </label>
    </div>
    <div class="__item">
      <input
        id="TextSizeTogglerBigger"
        :checked="data.largeText"
        class="__input"
        name="textSize"
        type="radio"
      />
      <label class="__label" for="TextSizeTogglerBigger">
        大きなテキスト
      </label>
    </div>
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
