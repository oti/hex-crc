import { getContrastRatio } from "./utility/getContrastRatio.mjs";
import { getResult } from "./utility/getResult.mjs";

export class Item {
  constructor($Item, id, colors) {
    this.colors = colors;
    this.ratio = getContrastRatio(this.colors);
    this.result = getResult(this.ratio);

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
    this.$ResultN = this.$Item.querySelector(".Result.-normal");
    this.$ResultL = this.$Item.querySelector(".Result.-large");

    this.bubblingOption = {
      bubbles: true,
      detail: {
        id: this.id,
      },
    };

    this.init(colors);
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

    this.updateColors(this.colors);
    this.updateRatio({ front, back });
    this.updateLevel();
    this.attachEvent();
  }

  attachEvent() {
    this.$Add.addEventListener("click", () => this.handleClickAdd(), false);
    this.$Del.addEventListener("click", () => this.handleClickDel(), false);
    this.$Clear.addEventListener("click", () => this.handleClickClear(), false);

    [this.$InputF, this.$ColorF].forEach(($) => {
      $.addEventListener("input", (e) => this.handleInputFront(e), false);
    });
    [this.$InputB, this.$ColorB].forEach(($) => {
      $.addEventListener("input", (e) => this.handleInputBack(e), false);
    });
  }

  handleClickAdd() {
    this.$Item.dispatchEvent(new CustomEvent("add", this.bubblingOption));
  }

  handleClickDel() {
    this.$Item.dispatchEvent(new CustomEvent("del", this.bubblingOption));
  }

  handleClickClear() {
    this.updateColors({ front: null, back: null });
    this.updateRatio({ front: null, back: null });
  }

  handleInputFront({ target: { value: front } }) {
    this.updateColors({ front, back: this.colors.back });

    this.updateRatio({
      front,
      back: this.colors.back,
    });

    this.updateLevel();
  }

  handleInputBack({ target: { value: back } }) {
    this.updateColors({ front: this.colors.front, back });

    this.updateRatio({
      front: this.colors.front,
      back,
    });

    this.updateLevel();
  }

  toggleDelState(value) {
    this.$Del.toggleAttribute("disabled", !value);
  }

  updateColors({ front, back }) {
    this.colors = { front, back };
    this.$InputF.value = front;
    this.$ColorF.value = front;
    this.$InputB.value = back;
    this.$ColorB.value = back;
    this.$ResultN.style.color = front;
    this.$ResultN.style.backgroundColor = back;
    this.$ResultL.style.color = front;
    this.$ResultL.style.backgroundColor = back;
  }

  updateLevel() {
    this.result = getResult(this.ratio);
    this.$ResultN.value = this.result.normal;
    this.$ResultL.value = this.result.large;
  }

  updateRatio(colors) {
    this.ratio = getContrastRatio(colors);
    this.$Ratio.value = this.ratio;
  }
}
