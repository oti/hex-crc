import { ColorItem } from "@/models/ColorItem";

/**
 * 値が文字列であるか否かを返す
 * @param val
 */
export function createColorItem(
  front: string = "",
  back: string = ""
): ColorItem {
  return {
    front,
    back,
  };
}
