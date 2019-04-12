<template>
  <div>
    <div class="dx-fieldset">
      <div class="dx-fieldset-header">SearchBox mode</div>
      <div class="dx-field">
        <div class="dx-field-label">Product</div>
        <div class="dx-field-value">
          <DxSelectBox
            :search-enabled="true"
            :items="products"
            display-expr="Name"
            value-expr="ID"
          />
        </div>
      </div>
    </div>
    <div class="dx-fieldset">
      <div class="dx-fieldset-header">EditBox mode</div>
      <div class="dx-field">
        <div class="dx-field-label">Product</div>
        <div class="dx-field-value">
          <DxSelectBox
            v-model="editBoxValue"
            :accept-custom-value="true"
            :items="simpleProducts"
            @customItemCreating="customItemCreating($event)"
          />
        </div>
      </div>
      <div class="dx-field current-product">
        Current product is <span class="current-value">{{ editBoxValue }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { DxSelectBox } from 'devextreme-vue/select-box';

import { products, simpleProducts } from './data.js';

export default {
  components: {
    DxSelectBox
  },
  data() {
    return {
      editBoxValue: simpleProducts[0],
      products,
      simpleProducts
    };
  },
  methods: {
    customItemCreating(data) {
      const item = data.text;
      const dataSource = data.component.getDataSource();

      data.customItem = item || '';

      if(item) {
        dataSource
          .store()
          .load({ filter: ['this', '=', item] })
          .done((items) => {
            if(!items.length) {
              dataSource.store().insert(item);
              dataSource.reload();
            }
          });
      }
    }
  }
};
</script>
<style scoped>
  .current-product {
    padding-top: 11px;
  }

  .current-value {
      font-weight: bold;
  }
</style>
