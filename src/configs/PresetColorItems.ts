import { ColorItem } from "@/models/ColorItem";

import { DecomojiColors } from "@decomoji/colors/src/DecomojiColors";

export const PresetColorItems: ColorItem[] = DecomojiColors.map((v) => ({
  front: `#${v.hex}`,
  back: "#f6f6f6",
}));
