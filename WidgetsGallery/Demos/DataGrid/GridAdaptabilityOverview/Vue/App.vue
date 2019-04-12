<template>
  <div>
    <dx-data-grid
      id="gridContainer"
      :data-source="dataSource"
      :column-hiding-enabled="true"
      :show-borders="true"
    >
      <dx-export
        :enabled="true"
        file-name="Orders"
      />
      <dx-editing
        :allow-adding="true"
        :allow-updating="true"
        mode="batch"
      />
      <dx-grouping
        :context-menu-enabled="true"
        expand-mode="rowClick"
      />
      <dx-group-panel
        :visible="true"
        empty-panel-text="Use the context menu of header columns to group data"
      />
      <dx-pager
        :allowed-page-sizes="[5, 8, 15, 30]"
        :show-info="true"
        :show-navigation-buttons="true"
        :show-page-size-selector="true"
        :visible="true"
      />
      <dx-paging :page-size="8"/>
      <dx-column-chooser
        :enabled="true"
        mode="select"
      />
      <dx-column
        :allow-grouping="false"
        :width="130"
        data-field="OrderNumber"
        caption="Invoice Number"
      />
      <dx-column
        data-field="CustomerStoreCity"
        caption="City"
      />
      <dx-column
        data-field="CustomerStoreState"
        caption="State"
      />
      <dx-column data-field="Employee"/>
      <dx-column
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
import { DxDataGrid, DxColumn, DxExport, DxEditing, DxGrouping, DxGroupPanel, DxPager, DxPaging, DxColumnChooser } from 'devextreme-vue/data-grid';
import service from './data.js';

export default {
  components: {
    DxDataGrid, DxColumn, DxExport, DxEditing, DxGrouping, DxGroupPanel, DxPager, DxPaging, DxColumnChooser
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
