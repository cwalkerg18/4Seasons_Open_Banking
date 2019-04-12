<template>
  <div>
    <dx-data-grid
      id="gridContainer"
      :data-source="orders"
      :show-borders="true"
      key-expr="ID"
    >
      <dx-selection mode="single"/>
      <dx-column
        :width="130"
        data-field="OrderNumber"
        caption="Invoice Number"
      />
      <dx-column
        :width="160"
        data-field="OrderDate"
        data-type="date"
      />
      <dx-column
        :group-index="0"
        data-field="Employee"
      />
      <dx-column
        data-field="CustomerStoreCity"
        caption="City"
      />
      <dx-column
        data-field="CustomerStoreState"
        caption="State"
      />
      <dx-column
        data-field="SaleAmount"
        alignment="right"
        format="currency"
      />
      <dx-column
        data-field="TotalAmount"
        alignment="right"
        format="currency"
      />

      <dx-summary>
        <dx-group-item
          column="OrderNumber"
          summary-type="count"
          display-format="{0} orders"
        />
        <dx-group-item
          :show-in-group-footer="false"
          :align-by-column="true"
          column="SaleAmount"
          summary-type="max"
          value-format="currency"
        />
        <dx-group-item
          :show-in-group-footer="false"
          :align-by-column="true"
          column="TotalAmount"
          summary-type="max"
          value-format="currency"
        />
        <dx-group-item
          :show-in-group-footer="true"
          column="TotalAmount"
          summary-type="sum"
          value-format="currency"
          display-format="Total: {0}"
        />
      </dx-summary>
      <dx-sort-by-group-summary-info summary-item="count"/>
    </dx-data-grid>
  </div>
</template>
<script>
import {
  DxDataGrid,
  DxColumn,
  DxSelection,
  DxSummary,
  DxGroupItem,
  DxSortByGroupSummaryInfo
} from 'devextreme-vue/data-grid';

import service from './data.js';

export default {
  components: {
    DxDataGrid,
    DxColumn,
    DxSelection,
    DxSummary,
    DxGroupItem,
    DxSortByGroupSummaryInfo
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
