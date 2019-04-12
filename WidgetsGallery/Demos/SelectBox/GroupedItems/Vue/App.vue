<template>
  <div class="dx-fieldset">
    <div class="dx-field">
      <div class="dx-field-label">
        Grouped items
      </div>
      <div class="dx-field-value">
        <DxSelectBox
          :data-source="products"
          :value="productsData[16].ID"
          :grouped="true"
          display-expr="Name"
          value-expr="ID"
        />
      </div>
    </div>
    <div class="dx-field">
      <div class="dx-field-label">
        Grouped items with search enabled
      </div>
      <div class="dx-field-value">
        <DxSelectBox
          :data-source="products"
          :value="productsData[17].ID"
          :grouped="true"
          :search-enabled="true"
          display-expr="Name"
          value-expr="ID"
        />
      </div>
    </div>
    <div class="dx-field">
      <div class="dx-field-label">
        Grouped items with a custom group template
      </div>
      <div class="dx-field-value">
        <DxSelectBox
          :data-source="products"
          :value="productsData[18].ID"
          :grouped="true"
          display-expr="Name"
          value-expr="ID"
        >
          <div
            slot="group"
            slot-scope="data"
          >
            <group :item-data="data"/>
          </div>
        </DxSelectBox>
      </div>
    </div>
  </div>
</template>
<script>
import { DxSelectBox } from 'devextreme-vue/select-box';
import DataSource from 'devextreme/data/data_source';
import Group from './Group.vue';

import productsData from './data.js';

export default {
  components: {
    DxSelectBox,
    Group
  },
  data() {
    return {
      productsData,
      products: new DataSource({
        store: productsData,
        key: 'ID',
        group: 'Category'
      })
    };
  }
};
</script>
