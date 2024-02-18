import { Ratio } from "./Ratio.mjs";

export class Item {
  constructor($Item, id, colors) {
    this.id = id;
    this.$Item = $Item;
    this.$Add = this.$Item.querySelector(".Add");
    this.$Del = this.$Item.querySelector(".Del");
    this.$Clear = this.$Item.querySelector(".Clear");
    this.$LabelF = this.$Item.querySelector(".Label.-f");
    this.$InputF = this.$Item.querySelector(".Input.-f");
    this.$ColorF = this.$Item.querySelector(".Color.-f");
    this.$LabelB = this.$Item.querySelector(".Label.-b");
    this.$InputB = this.$Item.querySelector(".Input.-b");
    this.$ColorB = this.$Item.querySelector(".Color.-b");
    this.$Ratio = this.$Item.querySelector(".Ratio");

    this.colors = {
      front: colors?.front ? colors.front : "#000000",
      back: colors?.back ? colors.back : "#ffffff",
    };
    this.ratio = new Ratio();
    /**
     * TODO
     *  コントラスト計算
     *    大きいテキストか否か
     *  WCAGとAPCTの切り替え
     *  達成度合の表示
     *
     */

    this.init();
  }

  init() {
    const {
      id,
      colors: { front, back },
    } = this;
    this.$Item.setAttribute("id", `item-${id}`);
    this.$LabelF.setAttribute("for", `f-${id}`);
    this.$LabelF.textContent = `前景色${id}`;
    this.$InputF.setAttribute("id", `f-${id}`);
    this.$InputF.value = front;
    this.$ColorF.value = front;
    this.$LabelB.setAttribute("for", `b-${id}`);
    this.$LabelB.textContent = `背景色${id}`;
    this.$InputB.setAttribute("id", `b-${id}`);
    this.$InputB.value = back;
    this.$ColorB.value = back;

    this.updateRatio({ front, back });
    this.attachEvent();
  }

  attachEvent() {
    this.$Add.addEventListener("click", () => this.handleClickAdd(), false);
    this.$Del.addEventListener("click", () => this.handleClickDel(), false);
    this.$Clear.addEventListener("click", () => this.handleClickClear(), false);
    this.$InputF.addEventListener(
      "input",
      (e) => this.handleInputFront(e),
      false,
    );
    this.$ColorF.addEventListener(
      "input",
      (e) => this.handleInputFront(e),
      false,
    );
    this.$InputB.addEventListener(
      "input",
      (e) => this.handleInputBack(e),
      false,
    );
    this.$ColorB.addEventListener(
      "input",
      (e) => this.handleInputBack(e),
      false,
    );
  }

  getBubblingOption(value) {
    return {
      bubbles: true,
      detail: {
        id: this.id,
        value,
      },
    };
  }

  toggleDelState(value) {
    this.$Del.toggleAttribute("disabled", !value);
  }

  setColors({ front, back }) {
    this.colors = { front, back };
    this.$InputF.value = front;
    this.$ColorF.value = front;
    this.$InputB.value = back;
    this.$ColorB.value = back;
  }

  syncColorFront(front) {
    this.setColors({ front, back: this.colors.back });
  }

  syncColorBack(back) {
    this.setColors({ front: this.colors.front, back });
  }

  updateRatio({ front, back }) {
    this.$Ratio.value = this.ratio.calcurate({
      front,
      back,
    });
  }

  handleClickAdd() {
    this.$Item.dispatchEvent(
      new CustomEvent("add", {
        bubbles: true,
        detail: {
          id: this.id,
        },
      }),
    );
  }

  handleClickDel() {
    this.$Item.dispatchEvent(
      new CustomEvent("del", {
        bubbles: true,
        detail: {
          id: this.id,
        },
      }),
    );
  }

  handleClickClear() {
    this.setColors({
      front: "#000000",
      back: "#ffffff",
    });
    this.$Item.dispatchEvent(
      new CustomEvent("clear", {
        bubbles: true,
        detail: {
          id: this.id,
        },
      }),
    );
  }

  handleInputFront({ target: { value } }) {
    this.updateRatio({
      front: value,
      back: this.colors.back,
    });

    this.$Item.dispatchEvent(
      new CustomEvent("input-front", this.getBubblingOption(value)),
    );
  }

  handleInputBack({ target: { value } }) {
    this.updateRatio({
      front: this.colors.front,
      back: value,
    });

    this.$Item.dispatchEvent(
      new CustomEvent("input-back", this.getBubblingOption(value)),
    );
  }
}
