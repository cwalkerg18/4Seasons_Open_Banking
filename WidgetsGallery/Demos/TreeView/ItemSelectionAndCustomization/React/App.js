import React from 'react';
import TreeView from 'devextreme-react/tree-view';
import List from 'devextreme-react/list';

import { products } from './data.js';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      checkedItems: []
    };
    this.selectionChanged = this.selectionChanged.bind(this);
  }

  render() {
    return (
      <div className={'form'}>
        <h4>Store: Super Mart of the West</h4>
        <TreeView
          id={'selection-treeview'}
          items={products}
          width={320}
          showCheckBoxesMode={'normal'}
          onItemSelectionChanged={this.selectionChanged}
          itemRender={renderTreeViewItem}
        />
        {' '}
        <div className={'selected-data'}>
          Selected Products
          <List
            id={'checked-items'}
            width={400}
            items={this.state.checkedItems}
            itemRender={renderListItem}
          />
        </div>
      </div>
    );
  }

  selectionChanged(e) {
    const value = e.node;
    if (this.isProduct(value)) {
      this.processProduct({
        id: value.key,
        text: value.text,
        itemData: value.itemData,
        selected: value.selected,
        category: value.parent.text
      });
    } else {
      value.items.forEach(product => {
        this.processProduct({
          id: product.key,
          text: product.text,
          itemData: product.itemData,
          selected: product.selected,
          category: value.text
        });
      });
    }
  }

  isProduct(data) {
    return !data.items.length;
  }

  processProduct(product) {
    this.setState(prevState => {
      let itemIndex = -1;
      const checkedItems = prevState.checkedItems;

      checkedItems.forEach((item, index) => {
        if (item.id === product.id) {
          itemIndex = index;
          return false;
        }
      });

      if (product.selected && itemIndex === -1) {
        checkedItems.push(product);
      } else if (!product.selected) {
        checkedItems.splice(itemIndex, 1);
      }

      return { checkedItems: checkedItems.slice(0) };
    });
  }
}

function renderTreeViewItem(value) {
  return (<div>{value.text + (value.price ? ` ($${value.price})` : '')}</div>);
}

function renderListItem(item) {
  return `${item.text} (${item.category}) - $${item.itemData.price}`;
}

export default App;
