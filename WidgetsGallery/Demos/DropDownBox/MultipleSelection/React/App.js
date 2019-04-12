﻿import React from 'react';
import { DropDownBox, TreeView } from 'devextreme-react';
import DataGrid, { Selection, Paging, FilterRow, Scrolling } from 'devextreme-react/data-grid';
import CustomStore from 'devextreme/data/custom_store';
import 'whatwg-fetch';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.treeView = null;
    this.treeDataSource = this.makeAsyncDataSource('treeProducts.json');
    this.gridDataSource = this.makeAsyncDataSource('customers.json');
    this.state = {
      treeBoxValue: ['1_1'],
      gridBoxValue: [3],
      gridSelectedRowKeys: [3]
    };
    this.gridColumns = ['CompanyName', 'City', 'Phone'];
    this.treeView_itemSelectionChanged = this.treeView_itemSelectionChanged.bind(this);
    this.syncTreeViewSelection = this.syncTreeViewSelection.bind(this);
    this.syncDataGridSelection = this.syncDataGridSelection.bind(this);
    this.dataGrid_onSelectionChanged = this.dataGrid_onSelectionChanged.bind(this);
    this.treeViewRender = this.treeViewRender.bind(this);
    this.dataGridRender = this.dataGridRender.bind(this);
  }
  makeAsyncDataSource(jsonFile) {
    return new CustomStore({
      loadMode: 'raw',
      key: 'ID',
      load: function() {
        return fetch(`../../../../data/${ jsonFile}`)
          .then(response => response.json());
      }
    });
  }

  render() {
    return (
      <div className={'dx-fieldset'}>
        <div className={'dx-field'}>
          <div className={'dx-field-label'}>DropDownBox with embedded TreeView</div>
          <div className={'dx-field-value'}>
            <DropDownBox
              value={this.state.treeBoxValue}
              valueExpr={'ID'}
              displayExpr={'name'}
              placeholder={'Select a value...'}
              showClearButton={true}
              dataSource={this.treeDataSource}
              onValueChanged={this.syncTreeViewSelection}
              contentRender={this.treeViewRender}
            />
          </div>
        </div>
        <div className={'dx-field'}>
          <div className={'dx-field-label'}>DropDownBox with embedded DataGrid</div>
          <div className={'dx-field-value'}>
            <DropDownBox
              value={this.state.gridBoxValue}
              valueExpr={'ID'}
              deferRendering={false}
              displayExpr={'CompanyName'}
              placeholder={'Select a value...'}
              showClearButton={true}
              dataSource={this.gridDataSource}
              onValueChanged={this.syncDataGridSelection}
              contentRender={this.dataGridRender}
            />
          </div>
        </div>
      </div>
    );
  }

  treeViewRender() {
    return (
      <TreeView dataSource={this.treeDataSource}
        ref={(ref) => this.treeView = ref}
        dataStructure={'plain'}
        keyExpr={'ID'}
        parentIdExpr={'categoryId'}
        selectionMode={'multiple'}
        showCheckBoxesMode={'normal'}
        selectNodesRecursive={false}
        displayExpr={'name'}
        selectByClick={true}
        onContentReady={this.syncTreeViewSelection}
        onItemSelectionChanged={this.treeView_itemSelectionChanged}
      />
    );
  }

  dataGridRender() {
    return (
      <DataGrid
        dataSource={this.gridDataSource}
        columns={this.gridColumns}
        hoverStateEnabled={true}
        selectedRowKeys={this.state.gridBoxValue}
        onSelectionChanged={this.dataGrid_onSelectionChanged}>
        <Selection mode={'multiple'} />
        <Scrolling mode={'infinite'} />
        <Paging enabled={true} pageSize={10} />
        <FilterRow visible={true} />
      </DataGrid>
    );
  }

  syncTreeViewSelection(e) {
    let treeView = (e.component.selectItem && e.component) || (this.treeView && this.treeView.instance);

    if (treeView) {
      if (e.value === null) {
        treeView.unselectAll();
      } else {
        let values = e.value || this.state.treeBoxValue;
        values && values.forEach(function(value) {
          treeView.selectItem(value);
        });
      }
    }

    if (e.value !== undefined) {
      this.setState({
        treeBoxValue: e.value
      });
    }
  }

  syncDataGridSelection(e) {
    this.setState({
      gridBoxValue: e.value || []
      //gridSelectedRowKeys: !e.value ? [] : [e.value]
    });
  }

  treeView_itemSelectionChanged(e) {
    this.setState({
      treeBoxValue: e.component.getSelectedNodesKeys()
    });
  }

  dataGrid_onSelectionChanged(e) {
    //const newValue = e.selectedRowKeys.length && e.selectedRowKeys || [];
    this.setState({
      gridBoxValue: e.selectedRowKeys.length && e.selectedRowKeys || []
      // gridSelectedRowKeys: !newValue ? [] : newValue
    });
  }
}

export default App;
