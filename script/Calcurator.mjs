import { isStringOfNotEmpty } from "./utility/isString.mjs";

export class Calcurator {
  constructor(value) {
    this.value = value;
  }

  get ratio() {
    const { front, back } = this.value;
    return isStringOfNotEmpty(front) && isStringOfNotEmpty(back)
      ? Math.round(this.calculateContrastRatio({ front, back }) * 1000) / 1000
      : NaN;
  }

  // HEXを{r,g,b}のオブジェクトに分解する
  convertToSplitedHex(hex) {
    const trimedHex = hex.charAt(0) == "#" ? hex.substring(1, 7) : hex;

    return {
      r: Math.round(parseInt(trimedHex.substring(0, 2), 16)),
      g: Math.round(parseInt(trimedHex.substring(2, 4), 16)),
      b: Math.round(parseInt(trimedHex.substring(4, 6), 16)),
    };
  }

  // 0~1のsRGB値に変換する
  convertToSrgbValue(value) {
    return value / 255;
  }

  // 輝度に変換する
  convertToLuminance(value) {
    if (value <= 0.03928) {
      return value / 12.92;
    } else {
      return Math.pow((value + 0.055) / 1.055, 2.4);
    }
  }

  // 相対輝度に変換する
  convertToRelativeLuminance({ r, g, b }) {
    const R = this.convertToLuminance(this.convertToSrgbValue(r));
    const G = this.convertToLuminance(this.convertToSrgbValue(g));
    const B = this.convertToLuminance(this.convertToSrgbValue(b));
    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
  }

  // コントラスト比を計算する
  calculateContrastRatio({ front, back }) {
    const L1 = this.convertToRelativeLuminance(this.convertToSplitedHex(front));
    const L2 = this.convertToRelativeLuminance(this.convertToSplitedHex(back));
    const bright = L1 > L2 ? L1 : L2; // 明るい方の相対輝度
    const dark = L1 < L2 ? L1 : L2; // 暗い方の相対輝度
    return (bright + 0.05) / (dark + 0.05);
  }

  setColor(value) {
    this.value = value;
  }
}
