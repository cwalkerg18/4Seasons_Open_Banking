import React from 'react';

import DataGrid, {
  Column,
  Editing,
  Paging,
  RequiredRule,
  PatternRule,
  EmailRule
} from 'devextreme-react/data-grid';
import { employees } from './data.js';

class App extends React.Component {

  render() {
    return (
      <React.Fragment>
        <DataGrid
          dataSource={employees}
          keyExpr={'ID'}
          showBorders={true}
          columnAutoWidth={true}
        >
          <Paging enabled={false} />
          <Editing
            mode={'batch'}
            allowUpdating={true}
            allowAdding={true} />
          <Column dataField={'FirstName'}>
            <RequiredRule />
          </Column>
          <Column dataField={'LastName'}>
            <RequiredRule />
          </Column>
          <Column dataField={'Position'}>
            <RequiredRule />
          </Column>
          <Column dataField={'Phone'}>
            <RequiredRule />
            <PatternRule
              message={'Your phone must have "(555) 555-5555" format!'}
              pattern={/^\(\d{3}\) \d{3}-\d{4}$/i}
            />
          </Column>
          <Column dataField={'Email'}>
            <RequiredRule />
            <EmailRule />
          </Column>
        </DataGrid>
      </React.Fragment>
    );
  }
}

export default App;
