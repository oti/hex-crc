export class Item {
  constructor($Item) {
    this.id = new Date().getTime().toString();
    this.$Item = $Item;
    console.log($Item);
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
      () => this.handleInputFront(),
      false,
    );
    this.$ColorF.addEventListener(
      "input",
      () => this.handleInputFront(),
      false,
    );
    this.$InputB.addEventListener("input", () => this.handleInputBack(), false);
    this.$ColorB.addEventListener("input", () => this.handleInputBack(), false);
  }

  handleClickAdd(event) {
    console.log("add", this.id);
    this.$Item.dispatchEvent(
      new CustomEvent("add", {
        bubbles: true,
        details: "add",
      }),
    );
  }

  handleClickDel(event) {
    console.log("del", this.id);
    this.$Item.dispatchEvent(
      new CustomEvent("del", {
        bubbles: true,
        details: "del",
      }),
    );
  }

  handleClickClear(event) {
    console.log("clear", this.id);
    // this.$Item.dispatchEvent(new CustomEvent("clear", {
    //   bubbles: true,
    //   details: "hoge"
    // }))
  }

  handleInputFront(event) {
    console.log(event.target.value);
    // this.$Input.value = event.target.value;
  }

  handleInputBack(event) {
    console.log(event.target.value);
    // this.$Input.value = event.target.value;
  }
}
