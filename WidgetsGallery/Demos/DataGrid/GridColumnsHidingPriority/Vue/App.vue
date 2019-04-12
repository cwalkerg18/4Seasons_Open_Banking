<template>
  <div>
    <dx-data-grid
      id="gridContainer"
      :data-source="dataSource"
      :column-hiding-enabled="true"
      :show-borders="true"
    >
      <dx-column
        :width="130"
        data-field="OrderNumber"
        caption="Invoice Number"
      />
      <dx-column
        :hiding-priority="0"
        data-field="CustomerStoreCity"
        caption="City"
      />
      <dx-column
        :hiding-priority="1"
        data-field="CustomerStoreState"
        caption="State"
      />
      <dx-column data-field="Employee"/>
      <dx-column
        :hiding-priority="2"
        data-field="OrderDate"
        data-type="date"
      />
      <dx-column
        data-field="SaleAmount"
        format="currency"
      />
    </dx-data-grid>
  </div>
</template>
<script>
import { DxDataGrid, DxColumn } from 'devextreme-vue/data-grid';
import service from './data.js';

export default {
  components: {
    DxDataGrid, DxColumn
  },
  data() {
    return {
      dataSource: service.getOrders()
    };
  }
};
</script>
<style scoped>
#gridContainer {
  padding: 10px;
}
</style>
