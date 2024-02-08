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

    this.mountItem();
    this.attachEvent();
  }

  mountItem() {
    const itemId = `item-${this.id}`;
    const fId = `f-${this.id}`;
    const bId = `b-${this.id}`;
    const fText = `前景色${this.id}`;
    const bText = `背景色${this.id}`;
    this.$Item.setAttribute("id", itemId);
    this.$LabelF.setAttribute("for", fId);
    this.$LabelF.textContent = fText;
    this.$InputF.setAttribute("id", fId);
    this.$LabelB.setAttribute("for", bId);
    this.$LabelB.textContent = bText;
    this.$InputB.setAttribute("id", bId);
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
