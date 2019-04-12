import React from 'react';

import { DataGrid, Column, Paging } from 'devextreme-react/data-grid';
import { NumberBox } from 'devextreme-react/number-box';
import 'devextreme/data/odata/store';

const dataSourceOptions = {
  store: {
    type: 'odata',
    key: 'Task_ID',
    url: 'https://js.devexpress.com/Demos/DevAV/odata/Tasks'
  },
  expand: 'ResponsibleEmployee',
  select: [
    'Task_ID',
    'Task_Subject',
    'Task_Start_Date',
    'Task_Status',
    'Task_Description',
    'Task_Completion',
    'ResponsibleEmployee/Employee_Full_Name'
  ]
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      taskSubject: '',
      taskDetails: '',
      taskStatus: '',
      taskProgress: '',
      focusedRowKey: 117
    };

    this.onFocusedRowChanged = this.onFocusedRowChanged.bind(this);
    this.onTaskIdChanged = this.onTaskIdChanged.bind(this);
  }
  onTaskIdChanged(e) {
    if(e.event && e.value > 0) {
      this.setState({ focusedRowKey: e.value });
    }
  }
  onFocusedRowChanging(e) {
    var rowsCount = e.component.getVisibleRows().length,
      pageCount = e.component.pageCount(),
      pageIndex = e.component.pageIndex();

    if(e.event.key && e.prevRowIndex === e.newRowIndex) {
      if(e.newRowIndex === rowsCount - 1 && pageIndex < pageCount - 1) {
        e.component.pageIndex(pageIndex + 1).done(function() {
          e.component.option('focusedRowIndex', 0);
        });
      } else if(e.newRowIndex === 0 && pageIndex > 0) {
        e.component.pageIndex(pageIndex - 1).done(function() {
          e.component.option('focusedRowIndex', rowsCount - 1);
        });
      }
    }
  }
  onFocusedRowChanged(e) {
    var progress = e.row.data.Task_Completion ? `${e.row.data.Task_Completion }%` : '';
    this.setState({
      taskSubject: e.row.data.Task_Subject,
      taskDetails: e.row.data.Task_Description,
      taskStatus: e.row.data.Task_Status,
      taskProgress: progress,
      focusedRowKey: e.component.option('focusedRowKey')
    });
  }
  render() {
    return (
      <div>
        <DataGrid
          id={'gridContainer'}
          dataSource={dataSourceOptions}
          focusedRowEnabled={true}
          focusedRowKey={this.state.focusedRowKey}
          onFocusedRowChanging={this.onFocusedRowChanging}
          onFocusedRowChanged={this.onFocusedRowChanged}
          showBorders={true}>
          <Paging pageSize={10} />
          <Column
            dataField={'Task_ID'}
            width={80} />
          <Column
            caption={'Start Date'}
            dataField={'Task_Start_Date'}
            dataType={'date'} />
          <Column
            caption={'Assigned To'}
            dataField={'ResponsibleEmployee.Employee_Full_Name'}
            dataType={'date'}
            allowSorting={false}
          />
          <Column
            caption={'Subject'}
            dataField={'Task_Subject'}
            width={350} />
          <Column
            caption={'Status'}
            dataField={'Task_Status'} />
        </DataGrid>

        {
          <div className={'task-info'}>
            <div className={'info'}>
              <div id={'taskSubject'}>{this.state.taskSubject}</div>
              <p id={'taskDetails'} dangerouslySetInnerHTML={{ __html: this.state.taskDetails }}></p>
            </div>
            <div className={'progress'}>
              <span id={'taskStatus'}>{this.state.taskStatus}</span>
              <span id={'taskProgress'}>{this.state.taskProgress}</span>
            </div>
          </div>
        }

        <div className={'options'}>
          <div className={'caption'}>Options</div>
          <div className={'option'}>
            <span>Focused row key </span>
            <NumberBox
              id={'taskId'}
              min={1}
              max={183}
              step={0}
              value={this.state.focusedRowKey}
              onValueChanged={this.onTaskIdChanged}>
            </NumberBox>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
