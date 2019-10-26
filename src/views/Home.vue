<template>
  <div class="Home">
    <GlobalHeader />
    <div class="__inner">
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
    <GlobalFooter />
  </div>
</template>

<script lang="ts">
import ContrastRatioItemRow from '@/components/ContrastRatioItemRow.vue'
import GlobalFooter from '@/components/GlobalFooter.vue'
import GlobalHeader from '@/components/GlobalHeader.vue'
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
    GlobalHeader
  }
})
export default class Home extends Vue {
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

  itemTitle(i: number) {
    return `カラーセット${i + 1}`
  }

  handleAddItem(i: number) {
    const { front, back } = this.items[i]
    this.items.splice(i + 1, 0, getDefaultItem(front, back))
  }

  handleClearItem(i: number) {
    this.items.splice(i, 1, getDefaultItem())
  }

  /**
   * @listens CompositeCardTextEnrollmentSiblingInfo@remove - 兄弟枠の削除
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
  .__inner
    margin-top: 3rem
    margin-bottom: 3rem
</style>
