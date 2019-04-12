import React from 'react';
import DataGrid, { Column, Export } from 'devextreme-react/data-grid';

import service from './data.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.orders = service.getOrders();
  }

  render() {
    return (
      <div>
        <DataGrid
          id={'gridContainer'}
          dataSource={this.orders}
          showBorders={true}
          onCellPrepared={this.onCellPrepared}>

          <Column dataField={'OrderNumber'} caption={'Invoice Number'} width={130} />
          <Column dataField={'OrderDate'} dataType={'date'} width={160} />
          <Column dataField={'Employee'} />
          <Column dataField={'CustomerStoreCity'} caption={'City'} />
          <Column dataField={'CustomerStoreState'} caption={'State'} />
          <Column dataField={'SaleAmount'} alignment={'right'} format={'currency'} />
          <Export enabled={true} customizeExcelCell={this.customizeExcelCell} />
        </DataGrid>
      </div>
    );
  }

  onCellPrepared(e) {
    if (e.rowType === 'data') {
      if (e.data.OrderDate < new Date(2014, 2, 3)) {
        e.cellElement.classList.add('oldOrder');
      }
      if (e.data.SaleAmount > 15000) {
        if (e.column.dataField === 'Employee') {
          e.cellElement.classList.add('highAmountOrder_employee');
        }
        if (e.column.dataField === 'SaleAmount') {
          e.cellElement.classList.add('highAmountOrder_saleAmount');
        }
      }
    }
  }

  customizeExcelCell(options) {
    if(options.gridCell.rowType === 'data') {
      if(options.gridCell.data.OrderDate < new Date(2014, 2, 3)) {
        options.font.color = '#AAAAAA';
      }
      if(options.gridCell.data.SaleAmount > 15000) {
        if (options.gridCell.column.dataField === 'Employee') {
          options.font.bold = true;
        }
        if (options.gridCell.column.dataField === 'SaleAmount') {
          options.backgroundColor = '#FFBB00';
          options.font.color = '#000000';
        }
      }
    }
  }
}

export default App;
