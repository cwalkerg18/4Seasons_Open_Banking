<template>
  <dx-data-grid
    :show-borders="true"
    :data-source="dataSource"
    :remote-operations="true"
    :height="600"
  >
    <dx-column
      data-field="CustomerID"
      caption="Customer"
    >
      <dx-lookup
        :data-source="customersData"
        value-expr="Value"
        display-expr="Text"
      />
      <dx-string-length-rule
        :max="5"
        message="The field Customer must be a string with a maximum length of 5."
      />
    </dx-column>
    <dx-column
      data-field="OrderDate"
      data-type="date"
    >
      <dx-required-rule message="The OrderDate field is required."/>
    </dx-column>
    <dx-column data-field="Freight">
      <dx-header-filter :group-interval="100"/>
      <dx-range-rule
        :min="0"
        :max="2000"
        message="The field Freight must be between 0 and 2000."
      />
    </dx-column>
    <dx-column data-field="ShipCountry">
      <dx-string-length-rule
        :max="15"
        message="The field ShipCountry must be a string with a maximum length of 15."
      />
    </dx-column>
    <dx-column
      data-field="ShipVia"
      caption="Shipping Company"
      data-type="number"
    >
      <dx-lookup
        :data-source="shippersData"
        value-expr="Value"
        display-expr="Text"
      />
    </dx-column>
    <dx-master-detail
      :enabled="true"
      template="masterDetailTemplate"
    />
    <div
      slot="masterDetailTemplate"
      slot-scope="order"
    >
      <master-detail-grid
        :id="order.key"
        :url="url"
      />
    </div>
    <dx-filter-row :visible="true"/>
    <dx-header-filter :visible="true"/>
    <dx-group-panel :visible="true"/>
    <dx-scrolling mode="virtual"/>
    <dx-editing
      :allow-adding="true"
      :allow-updating="true"
      :allow-deleting="true"
      mode="row"
    />
    <dx-grouping :auto-expand-all="false"/>
    <dx-summary>
      <dx-total-item
        column="Freight"
        summary-type="sum"
      >
        <dx-value-format
          :precision="2"
          type="decimal"
        />
      </dx-total-item>
      <dx-group-item
        column="Freight"
        summary-type="sum"
      >
        <dx-value-format
          :precision="2"
          type="decimal"
        />
      </dx-group-item>
      <dx-group-item summary-type="count"/>
    </dx-summary>
  </dx-data-grid>
</template>
<script>
import {
  DxDataGrid,
  DxColumn,
  DxEditing,
  DxFilterRow,
  DxHeaderFilter,
  DxGroupPanel,
  DxGrouping,
  DxScrolling,
  DxSummary,
  DxLookup,
  DxTotalItem,
  DxGroupItem,
  DxMasterDetail,
  DxStringLengthRule,
  DxRequiredRule,
  DxRangeRule,
  DxValueFormat
} from 'devextreme-vue/data-grid';

import MasterDetailGrid from 'MasterDetailGrid.vue';
import { createStore } from 'devextreme-aspnet-data-nojquery';

const url = 'https://js.devexpress.com/Demos/Mvc/api/DataGridWebApi';

const dataSource = createStore({
  key: 'OrderID',
  loadUrl: `${url}/Orders`,
  insertUrl: `${url}/InsertOrder`,
  updateUrl: `${url}/UpdateOrder`,
  deleteUrl: `${url}/DeleteOrder`,
  onBeforeSend: (method, ajaxOptions) => {
    ajaxOptions.xhrFields = { withCredentials: true };
  }
});

const customersData = createStore({
  key: 'Value',
  loadUrl: `${url}/CustomersLookup`,
  onBeforeSend: (method, ajaxOptions) => {
    ajaxOptions.xhrFields = { withCredentials: true };
  }
});

const shippersData = createStore({
  key: 'Value',
  loadUrl: `${url}/ShippersLookup`,
  onBeforeSend: (method, ajaxOptions) => {
    ajaxOptions.xhrFields = { withCredentials: true };
  }
});

export default {
  components: {
    DxDataGrid,
    DxColumn,
    DxEditing,
    DxFilterRow,
    DxHeaderFilter,
    DxGroupPanel,
    DxGrouping,
    DxScrolling,
    DxSummary,
    DxLookup,
    DxTotalItem,
    DxGroupItem,
    DxMasterDetail,
    DxStringLengthRule,
    DxRangeRule,
    DxRequiredRule,
    DxValueFormat,
    MasterDetailGrid
  },
  data() {
    return {
      url,
      customersData,
      shippersData,
      dataSource
    };
  }
};
</script>
