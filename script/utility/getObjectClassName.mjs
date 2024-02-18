/**
 * オブジェクトのクラス名を文字列で返す
 * @param val
 */
export function getObjectClassName(val) {
  return Object.prototype.toString.call(val);
}
