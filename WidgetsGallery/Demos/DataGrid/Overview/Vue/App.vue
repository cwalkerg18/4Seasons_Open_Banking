<template>
  <dx-data-grid
    :data-source="dataSource"
    :remote-operations="false"
    :allow-column-reordering="true"
    :row-alternation-enabled="true"
    :show-borders="true"
    @content-ready="onContentReady"
  >
    <dx-column
      :group-index="0"
      data-field="Product"
    />
    <dx-column
      data-field="Amount"
      caption="Sale Amount"
      data-type="number"
      format="currency"
      alignment="right"
    />
    <dx-column
      :allow-grouping="false"
      data-field="Discount"
      caption="Discount %"
      data-type="number"
      format="percent"
      alignment="right"
      cell-template="discountCellTemplate"
      css-class="bullet"
    />
    <dx-column
      data-field="SaleDate"
      data-type="date"
    />
    <dx-column
      data-field="Region"
      data-type="string"
    />
    <dx-column
      data-field="Sector"
      data-type="string"
    />
    <dx-column
      data-field="Channel"
      data-type="string"
    />
    <dx-column
      :width="150"
      data-field="Customer"
      data-type="string"
    />

    <dx-group-panel :visible="true"/>
    <dx-search-panel
      :visible="true"
      :highlight-case-sensitive="true"
    />
    <dx-grouping :auto-expand-all="false"/>
    <dx-pager
      :allowed-page-sizes="pageSizes"
      :show-page-size-selector="true"
    />
    <dx-paging :page-size="10"/>
    <div
      slot="discountCellTemplate"
      slot-scope="cellData"
    >
      <discount-cell :cell-data="cellData"/>
    </div>
  </dx-data-grid>
</template>
<script>

import {
  DxDataGrid,
  DxColumn,
  DxGrouping,
  DxGroupPanel,
  DxPager,
  DxPaging,
  DxSearchPanel
} from 'devextreme-vue/data-grid';

import DataSource from 'devextreme/data/data_source';
import 'devextreme/data/odata/store';

import DiscountCell from './DiscountCell.vue';

let collapsed = false;

export default {
  components: {
    DxDataGrid,
    DxColumn,
    DxGrouping,
    DxGroupPanel,
    DxPager,
    DxPaging,
    DxSearchPanel,
    DiscountCell
  },
  data() {
    return {
      dataSource: new DataSource({
        store: {
          type: 'odata',
          url: 'https://js.devexpress.com/Demos/SalesViewer/odata/DaySaleDtoes',
          beforeSend: function(request) {
            request.params.startDate = '2018-05-10';
            request.params.endDate = '2018-05-15';
          }
        }
      }),
      pageSizes: [10, 25, 50, 100],
      onContentReady: function(e) {
        if (!collapsed) {
          e.component.expandRow(['EnviroCare']);
          collapsed = true;
        }
      }
    };
  }
};
</script>
