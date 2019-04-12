import React from 'react';

import DataGrid, {
  Column,
  Editing,
  Paging,
  Lookup
} from 'devextreme-react/data-grid';
import { employees, states } from './data.js';

class App extends React.Component {
  render() {
    return (
      <div id={'data-grid-demo'}>
        <DataGrid
          dataSource={employees}
          keyExpr={'ID'}
          showBorders={true}
        >
          <Paging enabled={false} />
          <Editing
            mode={'batch'}
            allowUpdating={true} />
          <Column dataField={'Prefix'} caption={'Title'} width={70} />
          <Column dataField={'FirstName'} />
          <Column dataField={'LastName'} />
          <Column dataField={'Position'} width={170} />
          <Column dataField={'StateID'} caption={'State'} width={125}>
            <Lookup dataSource={states} valueExpr={'ID'} displayExpr={'Name'} />
          </Column>
          <Column dataField={'BirthDate'} dataType={'date'} showEditorAlways={true} />
        </DataGrid>
      </div>
    );
  }
}

export default App;
