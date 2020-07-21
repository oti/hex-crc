<template>
  <div class="ColorItemInputs">
    <p :class="['__label', { VisuallyHidden: !showsLabel }]">{{ label }}</p>
    <div class="__inputs">
      <input
        :value="value"
        class="__typeText"
        type="text"
        @input="handleInputColor"
      />
      <input
        :value="value"
        class="__typeColor"
        type="color"
        @input="handleInputColor"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { HTMLElementEvent } from "@/models/HTMLElementEvent";
import { NullableString } from "@/models/NullableString";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ColorItemInputs extends Vue {
  /**
   * 入力プロパティを定義する
   */
  @Prop({ default: "" }) label!: string;
  @Prop({ default: true }) showsLabel!: boolean;
  @Prop({ required: true }) value!: NullableString;

  /**
   * @listens input[type="text"][type="color"]@input
   */
  handleInputColor(event: HTMLElementEvent<HTMLInputElement>) {
    this.$emit("input", event.target.value);
  }
}
</script>
