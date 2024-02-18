import { getObjectClassName } from "./getObjectClassName.mjs";

/**
 * 値が文字列であるか否かを返す
 * @param val
 */
export function isString(val) {
  return getObjectClassName(val) === "[object String]";
}

/**
 * 値が空ではない文字列であるか否かを返す
 * @param val
 */
export function isStringOfNotEmpty(val) {
  return isString(val) && val.length > 0;
}
