<template>
  <div class="ColorItemLevel">
    <p :class="['__label', { VisuallyHidden: !showsLabel }]">WCAG2.1達成</p>
    <p
      class="__text"
      :style="`color: ${value.front}; background-color: ${value.back}`"
    >
      <a :href="noteref" :aria-describedby="describedby">{{ result }}</a>
    </p>
  </div>
</template>

<script lang="ts">
import { ColorItem } from "@/models/ColorItem";
import { Result } from "@/models/Result";
import { DataViewModel } from "@/store/modules/data/models";
import { Component, Prop, Vue } from "vue-property-decorator";
import { Getter } from "vuex-class";

@Component
export default class ColorItemLevel extends Vue {
  /**
   * viewModel を引き当てる
   */
  @Getter("data/viewModel") data!: DataViewModel;

  /**
   * 入力プロパティを定義する
   */
  @Prop({ default: NaN }) ratio!: number;
  @Prop({ default: true }) showsLabel!: boolean;
  @Prop({ required: true }) value!: ColorItem;

  /**
   * 内部ステートを定義する
   */
  resultMap: Result[] = ["Fail", "Not Bad", "AA", "AAA"];

  /**
   * @get - 達成レベルを返す
   */
  get level() {
    const { ratio, data } = this;
    const AAA: number = data.largeText ? 4.5 : 7;
    const AA: number = data.largeText ? 3 : 4.5;
    let level: number = 0;

    if (ratio >= 3) {
      level++;
    }
    if (ratio >= AA) {
      level++;
    }
    if (ratio >= AAA) {
      level++;
    }

    return level;
  }

  /**
   * 達成レベルに応じて結果を返す
   */
  get result() {
    return this.resultMap[this.level];
  }

  /**
   * ページ内リンクの参照先を返す
   */
  get noteref() {
    return this.level < 2 ? "#not-bad-and-fail" : null;
  }

  /**
   * aria-describledbyの参照先を返す
   */
  get describedby() {
    return this.level < 2 ? "not-bad-and-fail" : null;
  }
}
</script>
