import { isStringOfNotEmpty } from "./isString.mjs";

export function getContrastRatio({ front, back }) {
  // HEXを{r,g,b}のオブジェクトに分解する
  const convertToSplitedHex = (hex) => {
    const trimedHex = hex.charAt(0) == "#" ? hex.substring(1, 7) : hex;

    return {
      r: Math.round(parseInt(trimedHex.substring(0, 2), 16)),
      g: Math.round(parseInt(trimedHex.substring(2, 4), 16)),
      b: Math.round(parseInt(trimedHex.substring(4, 6), 16)),
    };
  };

  // 0~1のsRGB値に変換する
  const convertToSrgbValue = (value) => {
    return value / 255;
  };

  // 輝度に変換する
  const convertToLuminance = (value) => {
    if (value <= 0.03928) {
      return value / 12.92;
    } else {
      return Math.pow((value + 0.055) / 1.055, 2.4);
    }
  };

  // 相対輝度に変換する
  const convertToRelativeLuminance = ({ r, g, b }) => {
    const R = convertToLuminance(convertToSrgbValue(r));
    const G = convertToLuminance(convertToSrgbValue(g));
    const B = convertToLuminance(convertToSrgbValue(b));
    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
  };

  // コントラスト比を計算する
  const calculateContrastRatio = ({ front, back }) => {
    const L1 = convertToRelativeLuminance(convertToSplitedHex(front));
    const L2 = convertToRelativeLuminance(convertToSplitedHex(back));
    const bright = L1 > L2 ? L1 : L2; // 明るい方の相対輝度
    const dark = L1 < L2 ? L1 : L2; // 暗い方の相対輝度
    return (bright + 0.05) / (dark + 0.05);
  };

  return isStringOfNotEmpty(front) && isStringOfNotEmpty(back)
    ? Math.round(calculateContrastRatio({ front, back }) * 1000) / 1000
    : NaN;
}
