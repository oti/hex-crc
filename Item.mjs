export class Item {
  constructor($Item, id) {
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

    this.init();
    this.attachEvent();
  }

  init() {
    this.$Item.setAttribute("id", `item-${id}`);
    this.$LabelF.setAttribute("for", `f-${id}`);
    this.$LabelF.textContent = `前景色${id}`;
    this.$InputF.setAttribute("id", `f-${id}`);
    this.$LabelB.setAttribute("for", `b-${id}`);
    this.$LabelB.textContent = `背景色${id}`;
    this.$InputB.setAttribute("id", `b-${id}`);
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

  toggleDelState(value) {
    this.$Del.toggleAttribute("disabled", !value);
  }

  syncColorFront(color) {
    console.log("syncColorFront", color);
  }

  syncColorBack(color) {
    console.log("syncColorBack", color);
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
    this.$Item.dispatchEvent(
      new CustomEvent("input-front", {
        bubbles: true,
        detail: {
          id: this.id,
          value,
        },
      }),
    );
  }

  handleInputBack({ target: { value } }) {
    this.$Item.dispatchEvent(
      new CustomEvent("input-back", {
        bubbles: true,
        detail: {
          id: this.id,
          value,
        },
      }),
    );
  }
}
