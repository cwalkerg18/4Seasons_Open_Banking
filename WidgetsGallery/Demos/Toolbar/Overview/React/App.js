import React from 'react';

import Toolbar from 'devextreme-react/toolbar';
import List from 'devextreme-react/list';

import DataSource from 'devextreme/data/data_source';
import notify from 'devextreme/ui/notify';
import 'devextreme/ui/select_box';

import { productTypes, products } from './data.js';

const productsStore = new DataSource(products);
const items = [{
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
        productsStore.filter('type', '=', args.value);
      } else {
        productsStore.filter(null);
      }
      productsStore.load();
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
}];

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Toolbar items={items} />
        <List id={'products'} dataSource={productsStore} />
      </React.Fragment>
    );
  }
}

export default App;
