<template>
  <div class="ColorItemRatio">
    <p :class="['__label', { VisuallyHidden: !showsLabel }]">コントラスト比</p>
    <p class="__text">{{ ratio }}</p>
  </div>
</template>

<script lang="ts">
import { ColorItem } from "@/models/ColorItem";
import { isStringOfNotEmpty } from "@/utilities/isString";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ColorItemRatio extends Vue {
  /**
   * 入力プロパティを定義する
   */
  @Prop({ default: true }) showsLabel!: boolean;
  @Prop({ required: true }) value!: ColorItem;

  /**
   * @get コントラスト比を返す
   */
  get ratio() {
    const { front, back } = this.value;
    const _ratio =
      isStringOfNotEmpty(front) && isStringOfNotEmpty(back)
        ? Math.round(this.calculateContrastRatio(front, back) * 1000) / 1000
        : NaN;

    this.$emit("calc", _ratio);
    return _ratio;
  }

  /**
   * HEXをr,g,bの配列に分割する
   */
  convertToSplitedHex(hex: string) {
    const trimedHex = hex.charAt(0) == "#" ? hex.substring(1, 7) : hex;

    return [
      Math.round(parseInt(trimedHex.substring(0, 2), 16)),
      Math.round(parseInt(trimedHex.substring(2, 4), 16)),
      Math.round(parseInt(trimedHex.substring(4, 6), 16)),
    ];
  }

  /**
   * 0~1のsRGB値に変換する
   */
  convertToSrgbValue(value: number) {
    return value / 255;
  }

  /**
   * 輝度に変換する
   */
  convertToLuminance(value: number) {
    if (value <= 0.03928) {
      return value / 12.92;
    } else {
      return Math.pow((value + 0.055) / 1.055, 2.4);
    }
  }

  /**
   * 相対輝度に変換する
   */
  convertToRelativeLuminance(r: number, g: number, b: number) {
    let R = this.convertToLuminance(this.convertToSrgbValue(r));
    let G = this.convertToLuminance(this.convertToSrgbValue(g));
    let B = this.convertToLuminance(this.convertToSrgbValue(b));
    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
  }

  /**
   * コントラスト比を計算する
   */
  calculateContrastRatio(front: string, back: string) {
    const rgb1 = this.convertToSplitedHex(front);
    const rgb2 = this.convertToSplitedHex(back);
    const L1 = this.convertToRelativeLuminance(rgb1[0], rgb1[1], rgb1[2]);
    const L2 = this.convertToRelativeLuminance(rgb2[0], rgb2[1], rgb2[2]);
    const bright = L1 > L2 ? L1 : L2; // 明るい方の相対輝度
    const dark = L1 < L2 ? L1 : L2; // 暗い方の相対輝度
    return (bright + 0.05) / (dark + 0.05);
  }
}
</script>
