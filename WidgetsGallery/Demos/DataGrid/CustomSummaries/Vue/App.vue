<template>
  <div>
    <dx-data-grid
      id="gridContainer"
      :data-source="orders"
      :show-borders="true"
      :selected-row-keys="[1, 4, 7]"
      key-expr="ID"
      @selection-changed="onSelectionChanged"
    >
      <dx-paging :enabled="false"/>
      <dx-selection mode="multiple"/>
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
      <dx-summary :calculate-custom-summary="calculateSelectedRow">
        <dx-total-item
          name="SelectedRowsSummary"
          summary-type="custom"
          value-format="currency"
          display-format="Sum: {0}"
          show-in-column="SaleAmount"
        />
      </dx-summary>
    </dx-data-grid>
  </div>
</template>
<script>
import {
  DxDataGrid,
  DxColumn,
  DxPaging,
  DxSelection,
  DxSummary,
  DxTotalItem
} from 'devextreme-vue/data-grid';

import service from './data.js';

export default {
  components: {
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxSelection,
    DxSummary,
    DxTotalItem
  },
  data() {
    return {
      orders: service.getOrders()
    };
  },
  methods: {
    calculateSelectedRow(options) {
      if (options.name === 'SelectedRowsSummary') {
        if (options.summaryProcess === 'start') {
          options.totalValue = 0;
        } else if (options.summaryProcess === 'calculate') {
          if (options.component.isRowSelected(options.value.ID)) {
            options.totalValue = options.totalValue + options.value.SaleAmount;
          }
        }
      }
    },
    onSelectionChanged(e) {
      e.component.refresh(true);
    }
  }
};
</script>
<style scoped>
#gridContainer {
    height: 440px;
    margin-bottom: 10px;
}
</style>
