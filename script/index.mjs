import { Item } from "./Item.mjs";

export class CRC {
  constructor($Main) {
    this.number = 0;
    this.presetColors = [
      { front: "#dd3b40", back: "#f6f6f6" },
      { front: "#c05b2c", back: "#f6f6f6" },
      { front: "#9f7e00", back: "#f6f6f6" },
      { front: "#688200", back: "#f6f6f6" },
      { front: "#008c22", back: "#f6f6f6" },
      { front: "#008780", back: "#f6f6f6" },
      { front: "#0081b1", back: "#f6f6f6" },
      { front: "#477f9b", back: "#f6f6f6" },
      { front: "#5d79aa", back: "#f6f6f6" },
      { front: "#a156d2", back: "#f6f6f6" },
      { front: "#d43892", back: "#f6f6f6" },
      { front: "#a36969", back: "#f6f6f6" },
    ];
    this.$List = $Main.querySelector(".List");
    this.$Item = this.$List.querySelector(".Item");

    if (!this.$List || !this.$Item) return;

    this.items = [];
    this.observer = new MutationObserver(this.watchList.bind(this));
    this.init();
  }

  idGenerator() {
    return ++this.number;
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
    const colors = this.items.find((item) => item.id === invokerId).colors;
    const insertIdx = this.items.findIndex((item) => item.id === invokerId) + 1;
    const $Item = this.$Item.cloneNode(true);
    const _Item = new Item($Item, this.idGenerator(), colors);
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
    // const inputIdx = this.items.findIndex((v) => v.id === id);
    // this.items[inputIdx].syncColorFront(value);
  }

  handleInputBack({ id, value }) {
    // const inputIdx = this.items.findIndex((v) => v.id === id);
    // this.items[inputIdx].syncColorBack(value);
  }

  handleChangeList(value) {
    this.items.map((item) => item.toggleDelState(value));
  }

  watchList(mutationsList) {
    for (const mutation of mutationsList) {
      if (mutation.type === "childList") {
        this.handleChangeList(mutation.target.children.length > 1);
      }
    }
  }
}
