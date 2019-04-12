import React from 'react';
import DataGrid from 'devextreme-react/data-grid';

class App extends React.Component {
  render() {
    return (
      <DataGrid
        dataSource={'../../../../data/customers.json'}
        columns={['CompanyName', 'City', 'State', 'Phone', 'Fax']}
        showBorders={true}
      />
    );
  }
}

export default App;
