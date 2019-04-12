import React from 'react';

import DataGrid, {
  Column,
  Sorting,
  Paging
} from 'devextreme-react/data-grid';
import service from './data.js';
import DiffCell from './DiffCell.js';
import ChartCell from './ChartCell.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.dataSource = service.getWeekData();
  }
  render() {
    return (
      <DataGrid id={'gridContainer'}
        dataSource={this.dataSource}
        showRowLines={true}
        showColumnLines={false}
        showBorders={true}>
        <Sorting mode={'none'} />
        <Paging pageSize={10} />
        <Column dataField={'date'} width={110} dataType={'date'} />
        <Column caption={'Open'} cellComponent={DiffCell} />
        <Column caption={'Close'} cellComponent={DiffCell} />
        <Column caption={'Dynamics'} minWidth={320} cellComponent={ChartCell} />
        <Column caption={'High'} cellComponent={DiffCell} />
        <Column caption={'Low'} cellComponent={DiffCell} />
      </DataGrid>
    );
  }
}

export default App;
