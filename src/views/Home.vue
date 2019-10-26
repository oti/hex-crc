<template>
  <div class="Home">
    <GlobalHeader />
    <div class="__content">
      <div class="__textarea">
        <TextArea :value="textAreaValue" @input="handleInputTextArea" />
      </div>
      <div class="__action">
        <button class="ConvertButton" type="button" @click="convertDataToItems">
          <i class="material-icons" aria-hidden="true">get_app</i>
          <span>jsonからリストに反映</span>
        </button>
        <button class="ConvertButton" type="button" @click="convertItemsToData">
          <i class="material-icons" aria-hidden="true">publish</i>
          <span>リストからjsonに反映</span>
        </button>
      </div>
      <div class="__list">
        <ContrastRatioItemRow
          v-for="(item, i) in items"
          :key="i"
          :label="i === 0"
          :item-title="itemTitle(i)"
          :removable="items.length > 1"
          :value="item"
          @add="handleAddItem(i)"
          @clear="handleClearItem(i)"
          @remove="handleRemoveItem(i)"
        />
      </div>
    </div>
    <GlobalFooter />
  </div>
</template>

<script lang="ts">
import ContrastRatioItemRow from '@/components/ContrastRatioItemRow.vue'
import GlobalFooter from '@/components/GlobalFooter.vue'
import GlobalHeader from '@/components/GlobalHeader.vue'
import TextArea from '@/components/TextArea.vue'
import { ColorSet } from '@/models/ColorSet'
import { NullableString } from '@/models/NullableString'
import { Component, Prop, Vue } from 'vue-property-decorator'

const getDefaultItem = (
  front: NullableString = null,
  back: NullableString = null
): ColorSet => ({
  front,
  back
})

@Component({
  components: {
    ContrastRatioItemRow,
    GlobalFooter,
    GlobalHeader,
    TextArea
  }
})
export default class Home extends Vue {
  /**
   * 内部ステートを定義
   */
  textAreaValue: string = ''
  items: ColorSet[] = [
    {
      front: '#dc322f',
      back: '#f5f4f5'
    },
    {
      front: '#cb4b16',
      back: '#f5f4f5'
    },
    {
      front: '#b58900',
      back: '#f5f4f5'
    },
    {
      front: '#859900',
      back: '#f5f4f5'
    },
    {
      front: '#29a05e',
      back: '#f5f4f5'
    },
    {
      front: '#2aa198',
      back: '#f5f4f5'
    },
    {
      front: '#268bd2',
      back: '#f5f4f5'
    },
    {
      front: '#6c71c4',
      back: '#f5f4f5'
    },
    {
      front: '#a44ad3',
      back: '#f5f4f5'
    },
    {
      front: '#d33682',
      back: '#f5f4f5'
    },
    {
      front: '#657b83',
      back: '#f5f4f5'
    },
    {
      front: '#93a1a1',
      back: '#f5f4f5'
    }
  ]
  /**
   * @method - テキストをItemsのJSONに変換する
   */
  convertDataToItems() {
    this.items = JSON.parse(
      JSON.parse(JSON.stringify(this.textAreaValue))
    ) as ColorSet[]
  }

  /**
   * @method - Itemsのjsonをテキストに変換する
   */
  convertItemsToData() {
    this.textAreaValue = JSON.stringify(this.items)
  }

  /**
   * @method - カラーセットアイテムのタイトルを返す
   * @param i
   */
  itemTitle(i: number) {
    return `カラーセット${i + 1}`
  }

  /**
   * @listens TextArea@input - textareaの入力
   * @param value
   */
  handleInputTextArea(value: string) {
    this.textAreaValue = value
  }

  /**
   * @listens ContrastRatioItemRow@add - カラーセットアイテムの追加
   * @param i
   */
  handleAddItem(i: number) {
    const { front, back } = this.items[i]
    this.items.splice(i + 1, 0, getDefaultItem(front, back))
  }

  /**
   * @listens ContrastRatioItemRow@clear - カラーセットアイテムの色情報のクリア
   * @param i
   */
  handleClearItem(i: number) {
    this.items.splice(i, 1, getDefaultItem())
  }

  /**
   * @listens ContrastRatioItemRow@remove - カラーセットアイテムの削除
   * @param i
   */
  handleRemoveItem(i: number) {
    this.items.splice(i, 1)
  }
}
</script>

<style lang="sass" scoped>
@import '../assets/styles/configs'
.Home
  .__content
    margin-top: 2rem
    margin-bottom: 2rem

  .__textarea
    margin: auto
    padding-right: calc(var(--spaceGap) * 2)
    padding-left: calc(var(--spaceGap) * 2)
    max-width: 540px
    + .__action
      margin-top: 0.5rem

  .__action
    margin: auto
    max-width: 580px
    text-align: center

    + .__list
      margin-top: 3rem

  .__list
    margin: auto

.ConvertButton
  @extend %resetButton
  display: inline-flex
  justify-content: center
  align-items: center
  margin: calc(var(--spaceGap) / 2)
  padding: calc(var(--spaceGap) / 1.5) calc(var(--spaceGap) * 2)
  border: 1px solid var(--colorBorder)
  border-radius: 4px
  font-size: 0.7rem
  line-height: 1.2
  vartical-align: top
  background-color: #f5f4f5
  &:active
    transform: translateY(1px)
</style>
