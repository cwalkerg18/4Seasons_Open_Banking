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
        data-field="SaleAmount"
        alignment="right"
        format="currency"
      />
      <dx-summary>
        <dx-total-item
          column="OrderNumber"
          summary-type="count"
        />
        <dx-total-item
          :customize-text="customizeDate"
          column="OrderDate"
          summary-type="min"
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
  DxSelection,
  DxSummary,
  DxTotalItem
} from 'devextreme-vue/data-grid';
import Globalize from 'globalize';
import 'devextreme/localization/globalize/date';
import 'devextreme/localization/globalize/currency';

import service from './data.js';

export default {
  components: {
    DxDataGrid,
    DxColumn,
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
    customizeDate(data) {
      return `First: ${ Globalize.formatDate(data.value, { date: 'medium' })}`;
    }
  }
};
</script>
<style scoped>
#gridContainer {
    height: 440px;
}
</style>
