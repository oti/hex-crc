import { Item } from "./Item.mjs";

export class CRC {
  constructor($List) {
    this.$List = $List;
    this.$Item = this.$List.querySelector(".Item");

    if (!this.$List || !this.$Item) return;

    this.items = [];
    this.observer = new MutationObserver(this.watchList.bind(this));
    this.init();
  }

  get newId() {
    return new Date().getTime().toString();
  }

  init() {
    // 最初のアイテムはHTMLに書いてあるのでインスタンス化して items に追加するのみにする
    this.items.splice(0, 0, new Item(this.$Item, this.newId));
    this.items[0].toggleDelState(false);
    this.observer.observe(this.$List, { childList: true });
    this.attachEvent();
  }

  attachEvent() {
    this.$List.addEventListener(
      "add",
      ({ detail: { id } }) => this.handleAdd(id),
      false,
    );
    this.$List.addEventListener(
      "del",
      ({ detail: { id } }) => this.handleDel(id),
      false,
    );
    this.$List.addEventListener(
      "clear",
      ({ detail: { id } }) => this.handleClear(id),
      false,
    );
    this.$List.addEventListener(
      "input-front",
      ({ detail: { id, value } }) => this.handleInputFront({ id, value }),
      false,
    );
    this.$List.addEventListener(
      "input-back",
      ({ detail: { id, value } }) => this.handleInputBack({ id, value }),
      false,
    );
  }

  addItem(invokerId) {
    const insertIdx = this.items.findIndex((item) => item.id === invokerId) + 1;
    const $Item = this.$Item.cloneNode(true);
    const _Item = new Item($Item, this.newId);
    this.items.splice(insertIdx, 0, _Item);

    // リストにDOMを反映する
    this.$List.insertBefore(
      $Item,
      [...this.$List.querySelectorAll(".Item")][insertIdx],
    );
  }

  delItem(invokerId) {
    const delIdx = this.items.findIndex((v) => v.id === invokerId);
    this.items.splice(delIdx, 1);
    [...this.$List.querySelectorAll(".Item")][delIdx].remove();
  }

  handleAdd(id) {
    this.addItem(id);
  }

  handleDel(id) {
    this.delItem(id);
  }

  handleClear(id) {}

  handleInputFront({ id, value }) {
    const inputIdx = this.items.findIndex((v) => v.id === id);
    this.items[inputIdx].syncColorFront(value);
  }

  handleInputBack({ id, value }) {
    const inputIdx = this.items.findIndex((v) => v.id === id);
    this.items[inputIdx].syncColorBack(value);
  }

  watchList(mutationsList) {
    for (const mutation of mutationsList) {
      if (mutation.type === "childList") {
        this.items.map((item) =>
          item.toggleDelState(mutation.target.children.length > 1),
        );
      }
    }
  }
}
