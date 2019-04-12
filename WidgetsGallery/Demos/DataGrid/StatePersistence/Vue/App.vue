<template>
  <div>
    <div id="descContainer">Sort and filter data, group, reorder and resize columns, change page numbers and page size. Once you are done, <a @click="onRefreshClick">refresh</a> the web page to see that the grid’s state is automatically persisted to continue working from where you stopped.</div>
    <dx-data-grid
      id="gridContainer"
      :data-source="orders"
      :allow-column-resizing="true"
      :allow-column-reordering="true"
      :show-borders="true"
      key-expr="ID"
    >
      <dx-selection mode="single"/>
      <dx-filter-row :visible="true"/>
      <dx-group-panel :visible="true"/>
      <dx-state-storing
        :enabled="true"
        type="localStorage"
        storage-key="storage"
      />
      <dx-pager
        :show-page-size-selector="true"
        :allowed-page-sizes="[5, 10, 20]"
      />
      <dx-column
        :width="130"
        data-field="OrderNumber"
        caption="Invoice Number"
      />
      <dx-column
        data-field="OrderDate"
        sort-order="desc"
        data-type="date"
      />
      <dx-column
        data-field="SaleAmount"
        alignment="right"
        format="currency"
      />
      <dx-column data-field="Employee"/>
      <dx-column
        data-field="CustomerStoreCity"
        caption="City"
      />
      <dx-column
        :group-index="0"
        data-field="CustomerStoreState"
        caption="State"
      />
    </dx-data-grid>
  </div>
</template>
<script>
import { DxDataGrid, DxSelection, DxFilterRow, DxGroupPanel, DxStateStoring, DxPager, DxColumn } from 'devextreme-vue/data-grid';
import service from './data.js';

export default {
  components: {
    DxDataGrid, DxSelection, DxFilterRow, DxGroupPanel, DxStateStoring, DxPager, DxColumn
  },
  data() {
    return {
      orders: service.getOrders()
    };
  },
  methods: {
    onRefreshClick() {
      window.location.reload();
    }
  }
};
</script>
<style scoped>
#gridContainer {
    height: 440px;
    margin-top: 30px;
}

#descContainer  a {
    color: #f05b41;
    text-decoration: underline;
    cursor: pointer;
}

#descContainer  a:hover {
    text-decoration: none;
}
</style>
