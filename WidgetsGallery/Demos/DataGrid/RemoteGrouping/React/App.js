import React from 'react';
import DataGrid, { Column, GroupPanel, Scrolling, Lookup } from 'devextreme-react/data-grid';
import 'devextreme/data/odata/store';

const dataSourceOptions = {
  store: {
    type: 'odata',
    url: 'https://js.devexpress.com/Demos/DevAV/odata/Tasks'
  },
  expand: 'ResponsibleEmployee',
  select: [
    'Task_ID',
    'Task_Subject',
    'Task_Start_Date',
    'Task_Due_Date',
    'Task_Status',
    'Task_Priority',
    'ResponsibleEmployee/Employee_Full_Name'
  ]
};

const priority = [
  { name: 'High', value: 4 },
  { name: 'Urgent', value: 3 },
  { name: 'Normal', value: 2 },
  { name: 'Low', value: 1 }
];

class App extends React.Component {
  render() {
    return (
      <DataGrid
        id={'gridContainer'}
        dataSource={dataSourceOptions}
        showBorders={true}
      >
        <GroupPanel visible={true} />
        <Scrolling mode={'virtual'} />

        <Column
          dataField={'Task_ID'}
          width={90} />
        <Column
          dataField={'Task_Subject'}
          caption={'Subject'}
          width={190} />
        <Column
          dataField={'Task_Status'}
          caption={'Status'}
          groupIndex={0} />
        <Column
          dataField={'Task_Priority'}
          caption={'Priority'}
          groupIndex={1}>
          <Lookup
            dataSource={priority}
            displayExpr={'name'}
            valueExpr={'value'} />
        </Column>
        <Column
          dataField={'ResponsibleEmployee.Employee_Full_Name'}
          caption={'Assigned To'}
          allowGrouping={false}
          allowSorting={false} />
        <Column
          dataField={'Task_Start_Date'}
          caption={'Start Date'}
          dataType={'date'} />
        <Column
          dataField={'Task_Due_Date'}
          caption={'Due Date'}
          dataType={'date'} />
      </DataGrid>
    );
  }
}

export default App;
