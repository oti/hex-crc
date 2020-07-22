<template>
  <section class="SectionTextArea">
    <details class="Details">
      <summary calss="__summary">
        テキストエリアから色を入力する
      </summary>
      <div class="__content">
        <p>
          ※オブジェクトの<code>key</code>と<code>value</code>はダブルクォーテーションで囲ってください。
        </p>

        <textarea
          class="__textarea"
          :value="data.string"
          @input="handleInputTextArea"
        />

        <div class="__action">
          <button
            class="Button"
            type="button"
            @click="convertStringToColorItems"
          >
            <i class="material-icons" aria-hidden="true">get_app</i>
            <span>カラーセットに変換</span>
          </button>
          <button
            class="Button"
            type="button"
            @click="convertColorItemsToString"
          >
            <i class="material-icons" aria-hidden="true">publish</i>
            <span>連想配列に変換</span>
          </button>
        </div>
      </div>
    </details>
  </section>
</template>

<script lang="ts">
import { HTMLElementEvent } from "@/models/HTMLElementEvent";
import { DataAction, DataViewModel } from "@/store/modules/data/models";
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";

@Component
export default class SectionTextArea extends Vue {
  /**
   * viewModel を引き当てる
   */
  @Getter("data/viewModel") data!: DataViewModel;

  /**
   * アクションを引き当てる
   */
  @Action("data/convertStringToColorItems")
  convertStringToColorItems!: DataAction["convertStringToColorItems"];
  @Action("data/convertColorItemsToString")
  convertColorItemsToString!: DataAction["convertColorItemsToString"];
  @Action("data/updateTextAreaValue")
  updateTextAreaValue!: DataAction["updateTextAreaValue"];

  /**
   * @listens textarea@input
   */
  handleInputTextArea(event: HTMLElementEvent<HTMLTextAreaElement>) {
    this.updateTextAreaValue(event.target.value);
  }
}
</script>
