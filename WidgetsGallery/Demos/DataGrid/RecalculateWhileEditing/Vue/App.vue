<template>
  <div>
    <dx-data-grid
      id="gridContainer"
      :data-source="orders"
      :show-borders="true"
      :repaint-changes-only="true"
      key-expr="ID"
    >
      <dx-editing
        :allow-adding="true"
        :allow-updating="true"
        :allow-deleting="true"
        mode="batch"
      />

      <dx-column
        :width="130"
        data-field="OrderNumber"
        caption="Invoice Number"
      />
      <dx-column
        data-field="OrderDate"
        data-type="date"
      />
      <dx-column data-field="Employee"/>
      <dx-column
        data-field="CustomerStoreCity"
        caption="City"
      />
      <dx-column
        data-field="CustomerStoreState"
        caption="State"
      />
      <dx-column
        :editor-options="{ format: 'currency' }"
        data-field="SaleAmount"
        alignment="right"
        format="currency"
      />
      <dx-summary :recalculate-while-editing="true">
        <dx-total-item
          column="OrderNumber"
          summary-type="count"
        />
        <dx-total-item
          column="SaleAmount"
          summary-type="sum"
          value-format="currency"
        />
      </dx-summary>
    </dx-data-grid>
  </div>
</template>
<script>
import {
  DxDataGrid,
  DxColumn,
  DxEditing,
  DxSummary,
  DxTotalItem
} from 'devextreme-vue/data-grid';

import service from './data.js';

export default {
  components: {
    DxDataGrid,
    DxColumn,
    DxEditing,
    DxSummary,
    DxTotalItem
  },
  data() {
    return {
      orders: service.getOrders()
    };
  }
};
</script>
<style scoped>
#gridContainer {
    height: 440px;
}
</style>
