import { Item } from "./Item.mjs";

export class Collection {
  constructor(Main) {
    this.$Root = document.querySelector(Main);
    this.$List = this.$Root.querySelector(".List");
    this.$ItemTemplate = this.$Root.querySelector(".ItemTemplate");

    if (!this.$List || !this.$ItemTemplate) return;

    this.items = [];

    this.addItem(0);
    this.mountNode();
    this.attachEvent();
  }

  addItem(index) {
    const $Item = document.importNode(this.$ItemTemplate.content, true);
    this.items = this.items.toSpliced(index, 1, {
      instance: new Item($Item),
      node: $Item,
    });
  }

  delItem(index) {
    this.items = this.items.toSpliced(index, 1);
  }

  mountNode() {
    this.items.forEach(({ node }) => {
      this.$List.appendChild(node);
    });
  }

  unmountNode() {
    this.$List.querySelectorAll(".Item").forEach((item) => item.remove());
  }

  attachEvent() {}

  handleClickAdd() {
    this.unmountItem();
  }

  handleClickDel() {}
}
