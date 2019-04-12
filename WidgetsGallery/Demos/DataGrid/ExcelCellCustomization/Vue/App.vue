<template>
  <div>
    <dx-data-grid
      id="gridContainer"
      :data-source="orders"
      :show-borders="true"
      @cell-prepared="cellPrepared"
    >

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
      <dx-export
        :enabled="true"
        :customize-excel-cell="customizeExcelCell"
      />
    </dx-data-grid>
  </div>
</template>
<script>
import { DxDataGrid, DxColumn, DxExport } from 'devextreme-vue/data-grid';
import service from './data.js';

export default {
  components: {
    DxDataGrid, DxColumn, DxExport
  },
  data() {
    return {
      orders: service.getOrders()
    };
  },
  methods: {
    cellPrepared(e) {
      if(e.rowType === 'data') {
        if(e.data.OrderDate < new Date(2014, 2, 3)) {
          e.cellElement.classList.add('oldOrder');
        }
        if(e.data.SaleAmount > 15000) {
          if(e.column.dataField === 'Employee') {
            e.cellElement.classList.add('highAmountOrder_employee');
          }
          if(e.column.dataField === 'SaleAmount') {
            e.cellElement.classList.add('highAmountOrder_saleAmount');
          }
        }
      }
    },
    customizeExcelCell(options) {
      if(options.gridCell.rowType === 'data') {
        if(options.gridCell.data.OrderDate < new Date(2014, 2, 3)) {
          options.font.color = '#AAAAAA';
        }
        if(options.gridCell.data.SaleAmount > 15000) {
          if(options.gridCell.column.dataField === 'Employee') {
            options.font.bold = true;
          }
          if(options.gridCell.column.dataField === 'SaleAmount') {
            options.backgroundColor = '#FFBB00';
            options.font.color = '#000000';
          }
        }
      }
    }
  }
};
</script>

<style scoped>
#gridContainer {
    height: 440px;
}

.oldOrder {
    color: #AAAAAA;
}

.highAmountOrder_saleAmount {
    background-color: #FFBB00;
    color: #000000;
}

.highAmountOrder_employee {
    font-weight: bold;
}
</style>
