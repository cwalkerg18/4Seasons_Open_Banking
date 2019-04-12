import React from 'react';

import DataGrid, { Scrolling, Sorting, LoadPanel } from 'devextreme-react/data-grid';
import { generateData } from './data.js';

const dataSource = generateData(100000);

class App extends React.Component {
  render() {
    return (
      <DataGrid
        elementAttr ={{
          id: 'gridContainer'
        }}
        dataSource={dataSource}
        showBorders={true}
        customizeColumns={customizeColumns}
        onContentReady={onContentReady}
      >
        <Sorting mode={'none'} />
        <Scrolling mode={'virtual'} />
        <LoadPanel enabled={true} />
      </DataGrid>
    );
  }
}

function customizeColumns(columns) {
  columns[0].width = 70;
}

function onContentReady(e) {
  e.component.option('loadPanel.enabled', false);
}

export default App;
