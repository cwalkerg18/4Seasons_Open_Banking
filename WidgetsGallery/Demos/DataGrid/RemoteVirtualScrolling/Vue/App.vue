<template>
  <dx-data-grid
    id="gridContainer"
    :remote-operations="true"
    :word-wrap-enabled="true"
    :data-source="dataSource"
    :show-borders="true"
  >
    <dx-scrolling
      mode="virtual"
      row-rendering-mode="virtual"
    />
    <dx-paging :page-size="100"/>
    <dx-header-filter
      :visible="true"
      :allow-search="true"
    />

    <dx-column
      data-field="Id"
      width="75"
    />
    <dx-column
      data-field="StoreName"
      caption="Store"
      width="150"
    />
    <dx-column
      data-field="ProductCategoryName"
      caption="Category"
      width="120"
    />
    <dx-column
      data-field="ProductName"
      caption="Product"
    />
    <dx-column
      data-field="DateKey"
      caption="Date"
      data-type="date"
      format="yyyy-MM-dd"
      width="100"
    />
    <dx-column
      data-field="SalesAmount"
      caption="Amount"
      format="currency"
      width="100"
    >
      <dx-header-filter :group-interval="1000"/>
    </dx-column>
  </dx-data-grid>
</template>
<script>
import { DxDataGrid, DxScrolling, DxPaging, DxColumn, DxHeaderFilter } from 'devextreme-vue/data-grid';
import * as AspNetData from 'devextreme-aspnet-data-nojquery';

export default {
  components: {
    DxDataGrid,
    DxColumn,
    DxScrolling,
    DxPaging,
    DxHeaderFilter
  },
  data() {
    return {
      dataSource: AspNetData.createStore({
        key: 'Id',
        loadUrl: 'https://js.devexpress.com/Demos/WidgetsGalleryDataService/api/Sales'
      })
    };
  }
};
</script>
<style>
#gridContainer {
    height: 440px;
}
</style>
