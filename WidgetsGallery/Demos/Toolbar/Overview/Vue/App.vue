<template>
  <div>
    <dx-toolbar :items="items"/>
    <dx-list
      id="products"
      :data-source="productsStore"
    />
  </div>
</template>
<script>
import DxToolbar from 'devextreme-vue/toolbar';
import DxList from 'devextreme-vue/list';

import DataSource from 'devextreme/data/data_source';
import notify from 'devextreme/ui/notify';
import 'devextreme/ui/select_box';

import { productTypes, products } from './data.js';

export default {
  components: {
    DxToolbar,
    DxList
  },
  data() {
    return {
      productsStore: new DataSource(products),
      items: [{
        location: 'before',
        widget: 'dxButton',
        options: {
          type: 'back',
          text: 'Back',
          onClick: () => {
            notify('Back button has been clicked!');
          }
        }
      }, {
        location: 'before',
        widget: 'dxButton',
        locateInMenu: 'auto',
        options: {
          icon: 'refresh',
          onClick: () => {
            notify('Refresh button has been clicked!');
          }
        }
      }, {
        location: 'center',
        locateInMenu: 'never',
        template: () => {
          return '<div class=\'toolbar-label\'><b>Tom\'s Club</b> Products</div>';
        }
      }, {
        location: 'after',
        widget: 'dxSelectBox',
        locateInMenu: 'auto',
        options: {
          width: 140,
          items: productTypes,
          valueExpr: 'id',
          displayExpr: 'text',
          value: productTypes[0].id,
          onValueChanged: (args) => {
            if (args.value > 1) {
              this.productsStore.filter('type', '=', args.value);
            } else {
              this.productsStore.filter(null);
            }
            this.productsStore.load();
          }
        }
      }, {
        location: 'after',
        widget: 'dxButton',
        locateInMenu: 'auto',
        options: {
          icon: 'plus',
          onClick: () => {
            notify('Add button has been clicked!');
          }
        }
      }, {
        locateInMenu: 'always',
        text: 'Save',
        onClick: () => {
          notify('Save option has been clicked!');
        }
      }, {
        locateInMenu: 'always',
        text: 'Print',
        onClick: () => {
          notify('Print option has been clicked!');
        }
      }, {
        locateInMenu: 'always',
        text: 'Settings',
        onClick: () => {
          notify('Settings option has been clicked!');
        }
      }]
    };
  }
};
</script>
<style>
.toolbar-label,
.toolbar-label > b {
    font-size: 16px;
}

#products {
    margin-top: 10px;
}
</style>
