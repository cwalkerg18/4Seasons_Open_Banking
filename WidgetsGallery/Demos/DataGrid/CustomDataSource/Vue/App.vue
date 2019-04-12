<template>
  <dx-data-grid
    :columns="columns"
    :show-borders="true"
    :data-source="dataSource"
    :remote-operations="remoteOperations"
    :paging="paging"
    :pager="pager"
  />
</template>
<script>

import DxDataGrid from 'devextreme-vue/data-grid';
import CustomStore from 'devextreme/data/custom_store';
import 'whatwg-fetch';

const dataSource = {
  store: new CustomStore({
    load: function(loadOptions) {
      let params = '?';

      params += `skip=${loadOptions.skip}`;
      params += `&take=${loadOptions.take}`;

      if(loadOptions.sort) {
        params += `&orderby=${loadOptions.sort[0].selector}`;
        if(loadOptions.sort[0].desc) {
          params += ' desc';
        }
      }
      return fetch(`https://js.devexpress.com/Demos/WidgetsGallery/data/orderItems${params}`)
        .then(response => response.json())
        .then((data) => {
          return {
            data: data.items,
            totalCount: data.totalCount
          };
        })
        .catch(() => { throw 'Data Loading Error'; });
    }
  })
};

export default {
  components: {
    DxDataGrid
  },
  data() {
    return {
      columns: ['OrderNumber', 'OrderDate', 'StoreCity', 'StoreState', 'Employee',
        {
          dataField: 'SaleAmount',
          format: 'currency'
        }
      ],
      dataSource: dataSource,
      remoteOperations: {
        sorting: true,
        paging: true
      },
      paging: {
        pageSize: 12
      },
      pager: {
        showPageSizeSelector: true,
        allowedPageSizes: [8, 12, 20]
      }
    };
  }
};
</script>
