<template>
  <dx-data-grid
    :data-source="dataSource"
    :show-borders="true"
  >
    <dx-paging :page-size="10"/>
    <dx-pager
      :show-page-size-selector="true"
      :allowed-page-sizes="pageSizes"
      :show-info="true"
    />

    <dx-column data-field="CompanyName"/>
    <dx-column data-field="City"/>
    <dx-column data-field="State"/>
    <dx-column data-field="Phone"/>
    <dx-column data-field="Fax"/>
  </dx-data-grid>
</template>
<script>

import { DxDataGrid, DxColumn, DxPager, DxPaging } from 'devextreme-vue/data-grid';
import { customers } from './data.js';

export default {
  components: {
    DxDataGrid,
    DxColumn,
    DxPager,
    DxPaging
  },
  data() {
    return {
      dataSource: customers,
      pageSizes: [5, 10, 20]
    };
  }
};
</script>
