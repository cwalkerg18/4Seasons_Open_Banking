import React from 'react';

import DataGrid, {
  Column,
  Editing,
  Popup,
  Paging,
  Lookup,
  Position
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
            mode={'popup'}
            allowUpdating={true}>
            <Popup title={'Employee Info'} showTitle={true} width={700} height={345}>
              <Position my={'top'} at={'top'} of={window} />
            </Popup>
          </Editing>
          <Column dataField={'Prefix'} caption={'Title'} width={70} />
          <Column dataField={'FirstName'} />
          <Column dataField={'LastName'} />
          <Column dataField={'BirthDate'} dataType={'date'} />
          <Column dataField={'Position'} width={170} />
          <Column dataField={'HireDate'} dataType={'date'} />
          <Column dataField={'StateID'} caption={'State'} width={125}>
            <Lookup dataSource={states} valueExpr={'ID'} displayExpr={'Name'} />
          </Column>
        </DataGrid>
      </div>
    );
  }
}

export default App;
