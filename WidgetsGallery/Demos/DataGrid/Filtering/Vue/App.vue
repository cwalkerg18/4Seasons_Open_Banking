<template>
  <div>
    <dx-data-grid
      id="gridContainer"
      :ref="dataGridRefName"
      :data-source="orders"
      :on-initialized="onInitialized"
      :show-borders="true"
    >
      <dx-filter-row
        :visible="showFilterRow"
        :apply-filter="currentFilter"
      />
      <dx-header-filter
        :visible="showHeaderFilter"
      />
      <dx-search-panel
        :visible="true"
        :width="240"
        placeholder="Search..."
      />
      <dx-column
        :width="140"
        :header-filter="{groupInterval: 10000}"
        data-field="OrderNumber"
        caption="Invoice Number"
      />
      <dx-column
        :width="120"
        :calculate-filter-expression="calculateFilterExpression"
        :header-filter="{dataSource: orderHeaderFilter}"
        data-field="OrderDate"
        alignment="right"
        data-type="date"
      />
      <dx-column
        :width="180"
        data-field="DeliveryDate"
        alignment="right"
        data-type="datetime"
        format="M/d/yyyy, HH:mm"
      />
      <dx-column
        :header-filter="{dataSource: saleAmountHeaderFilter}"
        data-field="SaleAmount"
        alignment="right"
        format="currency"
      />
      <dx-column data-field="Employee"/>
      <dx-column
        :header-filter="{allowSearch: true}"
        data-field="CustomerStoreCity"
        caption="City"
      />
    </dx-data-grid>
    <div class="options">
      <div class="caption">Options</div>
      <div class="option">
        <span>Apply Filter</span>
        <dx-select-box
          id="useFilterApplyButton"
          :items="applyFilterTypes"
          :value.sync="currentFilter"
          :disabled="!showFilterRow"
          value-expr="key"
          display-expr="name"
        />
      </div>
      <div class="option">
        <dx-check-box
          :value.sync="showFilterRow"
          text="Filter Row"
          @valueChanged="clearFilter()"
        />
      </div>
      <div class="option">
        <dx-check-box
          :value.sync="showHeaderFilter"
          text="Header Filter"
          @valueChanged="clearFilter()"
        />
      </div>
    </div>
  </div>
</template>
<script>
import {
  DxDataGrid,
  DxColumn,
  DxHeaderFilter,
  DxSearchPanel,
  DxFilterRow
} from 'devextreme-vue/data-grid';
import { DxSelectBox, DxCheckBox } from 'devextreme-vue';

import service from './data.js';

const getOrderDay = (rowData) => {
  return (new Date(rowData.OrderDate)).getDay();
};

export default {
  components: {
    DxSelectBox,
    DxCheckBox,
    DxDataGrid,
    DxColumn,
    DxHeaderFilter,
    DxSearchPanel,
    DxFilterRow
  },
  data() {
    const applyFilterTypes = [
        {
          key: 'auto',
          name: 'Immediately'
        },
        {
          key: 'onClick',
          name: 'On Button Click'
        }], currentFilter = applyFilterTypes[0].key;
    return {
      orders: service.getOrders(),
      showFilterRow: true,
      showHeaderFilter: true,
      applyFilterTypes,
      saleAmountHeaderFilter:  [{
        text: 'Less than $3000',
        value: ['SaleAmount', '<', 3000]
      }, {
        text: '$3000 - $5000',
        value: [
          ['SaleAmount', '>=', 3000],
          ['SaleAmount', '<', 5000]
        ]
      }, {
        text: '$5000 - $10000',
        value: [
          ['SaleAmount', '>=', 5000],
          ['SaleAmount', '<', 10000]
        ]
      }, {
        text: '$10000 - $20000',
        value: [
          ['SaleAmount', '>=', 10000],
          ['SaleAmount', '<', 20000]
        ]
      }, {
        text: 'Greater than $20000',
        value: ['SaleAmount', '>=', 20000]
      }],
      currentFilter,
      dataGridRefName: 'dataGrid'
    };
  },
  methods: {
    calculateFilterExpression(value, selectedFilterOperations, target) {
      let column = this;
      if(target === 'headerFilter' && value === 'weekends') {
        return [[getOrderDay, '=', 0], 'or', [getOrderDay, '=', 6]];
      }
      return column.defaultCalculateFilterExpression.apply(this, arguments);
    },
    orderHeaderFilter(data) {
      data.dataSource.postProcess = (results) => {
        results.push({
          text: 'Weekends',
          value: 'weekends'
        });
        return results;
      };
    },
    clearFilter() {
      this.$refs[this.dataGridRefName].instance.clearFilter();
    },
    onInitialized(e) {
      e.component.columnOption('SaleAmount', {
        editorOptions: {
          format: 'currency',
          showClearButton: true
        }
      });
    }
  }
};
</script>
<style scoped>
#gridContainer {
  height: 440px;
}

.options {
  padding: 20px;
  margin-top: 20px;
  background-color: rgba(191, 191, 191, 0.15);
}

.caption {
  font-size: 18px;
  font-weight: 500;
}

.option {
  margin-top: 10px;
}

.option > span {
  margin-right: 10px;
}

.option > .dx-selectbox {
  display: inline-block;
  vertical-align: middle;
}
</style>
