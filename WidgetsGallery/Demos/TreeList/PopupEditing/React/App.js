import React from 'react';
import { TreeList, Editing, Column, ValidationRule } from 'devextreme-react/tree-list';
import { employees } from './data.js';

const expandedRowKeys = [1];

const popupOptions = {
  title: 'Employee Info',
  showTitle: true,
  width: 700,
  position: { my: 'top', at: 'top', of: window }
};

class App extends React.Component {
  render() {
    return (
      <div id={'tree-list-demo'}>
        <TreeList
          dataSource={employees}
          columnAutoWidth={true}
          showRowLines={true}
          showBorders={true}
          defaultExpandedRowKeys={expandedRowKeys}
          keyExpr={'ID'}
          parentIdExpr={'Head_ID'}
          onCellPrepared={this.onCellPrepared}
        >
          <Editing allowUpdating={true} allowDeleting={true} allowAdding={true} popup={popupOptions} mode={'popup'} />
          <Column dataField={'Full_Name'}>
            <ValidationRule type={'required'} />
          </Column>
          <Column dataField={'Prefix'} caption={'Title'}>
            <ValidationRule type={'required'} />
          </Column>
          <Column dataField={'Title'} caption={'Position'}>
            <ValidationRule type={'required'} />
          </Column>
          <Column width={150} dataField={'City'}>
            <ValidationRule type={'required'} />
          </Column>
          <Column width={120} dataField={'Hire_Date'} dataType={'date'}>
            <ValidationRule type={'required'} />
          </Column>
        </TreeList>
      </div>
    );
  }

  onCellPrepared(e) {
    if(e.column.command === 'edit') {
      let addLink = e.cellElement.querySelector('.dx-link-add');

      if(addLink) {
        addLink.remove();
      }
    }
  }
}

export default App;
