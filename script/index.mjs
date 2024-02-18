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
    this.$Textarea = $Main.querySelector("#Textarea");
    this.$ConvertToItems = $Main.querySelector("#ConvertToItems");
    this.$ConvertToArray = $Main.querySelector("#ConvertToArray");
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
    this.$Textarea.value = JSON.stringify(this.presetColors);
    this.replaceItems(this.presetColors);
    this.observer.observe(this.$List, { childList: true });
    this.attachEvent();
  }

  attachEvent() {
    this.$ConvertToItems.addEventListener(
      "click",
      () => this.handleClickConvertToItems(),
      false,
    );
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

  replaceItems(colorSet) {
    this.$List.querySelectorAll(".Item").forEach((item) => item.remove());

    this.items = colorSet.map((colors) => {
      const $Item = this.$Item.cloneNode(true);
      this.$List.append($Item);
      return new Item($Item, this.idGenerator(), colors);
    });
  }

  handleAdd(id) {
    this.addItem(id);
  }

  handleDel(id) {
    this.delItem(id);
  }

  handleClear(id) {}

  handleClickConvertToItems() {
    const value = this.$Textarea.value;
    try {
      const data = JSON.parse(value);
      // 配列でアイテムが１つ以上ある場合のみフォームに変換する
      if (Array.isArray(data) && data.length > 0) {
        this.replaceItems(data);
      }
    } catch (e) {
      throw Error(e);
    }
  }

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
