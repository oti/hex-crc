import { Item } from "./Item.mjs";

export class CRC {
  constructor($List) {
    this.$List = $List;
    this.$Template = this.$List.querySelector(".Item");

    if (!this.$List || !this.$Template) return;

    this.addEvent = this.handleClickAdd.bind(this);
    this.delEvent = this.handleClickDel.bind(this);
    this.clearEvent = this.handleClickClear.bind(this);

    this.items = [];
    this.attachEvent();
    this.mountItems();
  }

  attachEvent() {
    this.$List.querySelectorAll(".Item").forEach(($item) => {
      $item
        .querySelector(".Add")
        .addEventListener("click", this.addEvent, false);
      $item
        .querySelector(".Delete")
        .addEventListener("click", this.delEvent, false);
    });
  }

  detacheEvent() {
    this.$List.querySelectorAll(".Item").forEach(($item) => {
      $item
        .querySelector(".Add")
        .removeEventListener("click", this.addEvent, false);
      $item
        .querySelector(".Delete")
        .removeEventListener("click", this.delEvent, false);
    });
  }

  mountItems() {
    this.items = [...this.$List.querySelectorAll(".Item")].map(
      ($item, index, items) => {
        const itemId = `item-${index + 1}`;
        const fId = `f-${index + 1}`;
        const bId = `b-${index + 1}`;
        const fText = `前景色${index + 1}`;
        const bText = `背景色${index + 1}`;
        $item
          .querySelector(".Delete")
          .toggleAttribute("disabled", items.length === 1);
        $item.setAttribute("id", itemId);
        $item.querySelector(".Label.-f").setAttribute("for", fId);
        $item.querySelector(".Label.-f").textContent = fText;
        $item.querySelector(".Input.-f").setAttribute("id", fId);
        $item.querySelector(".Label.-b").setAttribute("for", bId);
        $item.querySelector(".Label.-b").textContent = bText;
        $item.querySelector(".Input.-b").setAttribute("id", bId);
        $item
          .querySelector(".Add")
          .addEventListener("click", this.addEvent, false);
        $item
          .querySelector(".Delete")
          .addEventListener("click", this.delEvent, false);
        $item
          .querySelector(".Clear")
          .addEventListener("click", this.clearEvent, false);

        return new Item($item);
      },
    );
  }

  unmountItems() {
    this.items = [...this.$List.querySelectorAll(".Item")].map(
      ($item, index, items) => {
        $item
          .querySelector(".Add")
          .removeEventListener("click", this.addEvent, false);
        $item
          .querySelector(".Delete")
          .removeEventListener("click", this.delEvent, false);
        $item
          .querySelector(".Clear")
          .removeEventListener("click", this.clearEvent, false);

        return new Item($item);
      },
    );
  }

  handleClickAdd(detail) {
    console.log("add");
    this.detacheEvent();
    const item = this.$Template.cloneNode(true);
    this.$List.appendChild(item);
    this.attachEvent();
    this.mountItems();
  }

  handleClickDel(event) {
    console.log("delete");
    this.detacheEvent();
    event.target.closest(".Item").remove();
    this.attachEvent();
    this.mountItems();
  }

  handleClickClear(detail) {
    console.log("clear");
  }
}
