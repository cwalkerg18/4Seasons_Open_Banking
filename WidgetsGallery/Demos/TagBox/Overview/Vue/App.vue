<template>
  <div class="dx-fieldset">
    <div class="dx-field">
      <div class="dx-field-label">Default mode</div>
      <div class="dx-field-value">
        <dx-tag-box :items="simpleProducts"/>
      </div>
    </div>
    <div class="dx-field">
      <div class="dx-field-label">Search mode</div>
      <div class="dx-field-value">
        <dx-tag-box
          :items="simpleProducts"
          :search-enabled="true"
        />
      </div>
    </div>
    <div class="dx-field">
      <div class="dx-field-label">Batch selection</div>
      <div class="dx-field-value">
        <dx-tag-box
          :items="simpleProducts"
          :show-selection-controls="true"
          apply-value-mode="useButtons"
        />
      </div>
    </div>
    <div class="dx-field">
      <div class="dx-field-label">Hide selected items</div>
      <div class="dx-field-value">
        <dx-tag-box
          :items="simpleProducts"
          :hide-selected-items="true"
        />
      </div>
    </div>
    <div class="dx-field">
      <div class="dx-field-label">Single line mode</div>
      <div class="dx-field-value">
        <dx-tag-box
          :items="simpleProducts"
          :multiline="false"
        />
      </div>
    </div>
    <div class="dx-field">
      <div class="dx-field-label">Edit mode</div>
      <div class="dx-field-value">
        <dx-tag-box
          :items="editableProducts"
          :accept-custom-value="true"
          @customItemCreating="onCustomItemCreating"
        />
      </div>
    </div>
    <div class="dx-field">
      <div class="dx-field-label">With custom placeholder</div>
      <div class="dx-field-value">
        <dx-tag-box
          :items="simpleProducts"
          placeholder="Choose Product..."
        />
      </div>
    </div>
    <div class="dx-field">
      <div class="dx-field-label">Disabled</div>
      <div class="dx-field-value">
        <dx-tag-box
          :items="simpleProducts"
          :value="[simpleProducts[0]]"
          :disabled="true"
        />
      </div>
    </div>
    <div class="dx-field">
      <div class="dx-field-label">Data source</div>
      <div class="dx-field-value">
        <dx-tag-box
          :data-source="products"
          display-expr="Name"
          value-expr="Id"
        />
      </div>
    </div>
    <div class="dx-field">
      <div class="dx-field-label">Custom template</div>
      <div class="dx-field-value">
        <dx-tag-box
          :data-source="products"
          display-expr="Name"
          value-expr="Id"
          item-template="item"
        >
          <div
            slot="item"
            slot-scope="data"
          >
            <item :item-data="data"/>
          </div>
        </dx-tag-box>
      </div>
    </div>
  </div>
</template>
<script>
import { DxTagBox } from 'devextreme-vue';
import ArrayStore from 'devextreme/data/array_store';
import Item from './Item.vue';

import { simpleProducts, products } from './data.js';

export default {
  components: {
    DxTagBox,
    Item
  },
  data() {
    return {
      products,
      simpleProducts,
      editableProducts: simpleProducts.slice(),
      data: new ArrayStore({
        data: products,
        key: 'ID'
      }),
      value: simpleProducts[0],
      onCustomItemCreating: (args) => {
        const newValue = args.text;
        args.customItem = newValue;
        this.editableProducts.unshift(newValue);
      }
    };
  }
};
</script>
<style scoped>
body .custom-item {
    padding-left: 7px;
    padding-right: 7px;
}
.custom-item > img {
    height: 30px;
    width: 40px;
    float: left;
    margin-top: 2px;
}
.custom-item > div.product-name {
    margin-left: 40px;
    line-height: 34px;
    font-size: 14px;
}

body .custom-item input {
    background-color: transparent;
}

body .dx-popup-content .custom-item {
    padding-top: 7px;
    padding-bottom: 8px;
}
.dx-popup-content .custom-item > div {
    padding-left: 8px;
    text-indent: 0;
    text-overflow: ellipsis;
    overflow: hidden;
}
</style>
