<template>
  <dx-data-grid
    :data-source="dataSource"
    :show-borders="true"
  >
    <dx-column data-field="Product_ID"/>
    <dx-column
      :width="250"
      data-field="Product_Name"
    />
    <dx-column
      data-field="Product_Cost"
      caption="Cost"
      data-type="number"
      format="currency"
    />
    <dx-column
      data-field="Product_Sale_Price"
      caption="Sale Price"
      data-type="number"
      format="currency"
    />
    <dx-column
      data-field="Product_Retail_Price"
      caption="Retail Price"
      data-type="number"
      format="currency"
    />
    <dx-column
      data-field="Product_Current_Inventory"
      caption="Inventory"
    />
  </dx-data-grid>
</template>
<script>
import 'devextreme/data/odata/store';
import { DxDataGrid, DxColumn } from 'devextreme-vue/data-grid';

export default {
  components: {
    DxDataGrid,
    DxColumn
  },
  data() {
    return {
      dataSource: {
        store: {
          type: 'odata',
          url: 'https://js.devexpress.com/Demos/DevAV/odata/Products'
        },
        select: [
          'Product_ID',
          'Product_Name',
          'Product_Cost',
          'Product_Sale_Price',
          'Product_Retail_Price',
          'Product_Current_Inventory'
        ],
        filter: ['Product_Current_Inventory', '>', 0]
      }
    };
  }
};
</script>
