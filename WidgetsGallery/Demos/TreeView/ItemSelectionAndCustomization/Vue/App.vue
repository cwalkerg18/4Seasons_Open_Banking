<template>
  <div class="form">
    <h4>Store: Super Mart of the West</h4>
    <dx-tree-view
      id="simple-treeview"
      :items="products"
      :width="320"
      show-check-boxes-mode="normal"
      @item-selection-changed="selectionChanged"
    >
      <div
        slot="item"
        slot-scope="value"
      >{{ value.text + (value.price ? ' ($' + value.price + ')' : '') }}</div>
    </dx-tree-view>
    <div class="selected-data">Selected Products
      <dx-list
        id="checked-items"
        :width="400"
        :items="checkedItems"
      >
        <div
          slot="item"
          slot-scope="item"
        >{{ item.text + " (" + item.category + ") - $" + item.itemData.price }}</div>
      </dx-list>
    </div>
  </div>
</template>
<script>
import { DxTreeView, DxList } from 'devextreme-vue';

import { products } from './data.js';

export default {
  components: {
    DxTreeView,
    DxList
  },
  data() {
    return {
      products,
      checkedItems: []
    };
  },
  methods: {
    selectionChanged(e) {
      const value = e.node;
      if (this.isProduct(value)) {
        this.processProduct({
          id: value.key,
          text: value.text,
          itemData: value.itemData,
          selected: value.selected,
          category: value.parent.text
        });
      } else {
        value.items.forEach(product => {
          this.processProduct({
            id: product.key,
            text: product.text,
            itemData: product.itemData,
            selected: product.selected,
            category: value.text
          });
        });
      }
    },

    isProduct(data) {
      return !data.items.length;
    },

    processProduct(product) {
      let itemIndex = -1;

      this.checkedItems.forEach((item, index) => {
        if (item.id === product.id) {
          itemIndex = index;
          return false;
        }
      });

      if (product.selected && itemIndex === -1) {
        this.checkedItems.push(product);
      } else if (!product.selected) {
        this.checkedItems.splice(itemIndex, 1);
      }
    }
  }
};
</script>
<style scoped>
.form > h4 {
  margin-bottom: 20px;
}

.form > div,
#selection-treeview {
  display: inline-block;
  vertical-align: top;
}

#checked-items {
  margin-top: 20px;
}

.selected-data {
  padding: 20px;
  background: #f5f5f5;
  font-size: 115%;
  font-weight: bold;
}

.dx-list-item-content {
  padding-left: 0;
}
</style>
