import React from 'react';
import DataGrid from 'devextreme-react/data-grid';
import { customers } from './data.js';

class App extends React.Component {
  render() {
    return (
      <DataGrid
        dataSource={customers}
        columns={['CompanyName', 'City', 'State', 'Phone', 'Fax']}
        showBorders={true}
      />
    );
  }
}

export default App;
