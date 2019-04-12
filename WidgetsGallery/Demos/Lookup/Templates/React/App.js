import React from 'react';
import { Lookup } from 'devextreme-react/lookup';

import { employees } from './data.js';
import Field from './Field.js';
import Item from './Item.js';

class App extends React.Component {
  render() {
    return (
      <div>
        <div className={'dx-fieldset'}>
          <div className={'dx-fieldset-header'}>Custom Field Template</div>
          <div className={'dx-field'}>
            <Lookup className={'field-customization'}
              defaultValue={employees[0].ID}
              displayExpr={this.getDisplayExpr}
              valueExpr={'ID'}
              items={employees}
              searchEnabled={true}
              title={'Select employee'}
              fieldComponent={Field} />
          </div>
        </div>
        <div className={'dx-fieldset'}>
          <div className={'dx-fieldset-header'}>Custom Item Template</div>
          <div className={'dx-field'}>
            <Lookup
              items={employees}
              displayExpr={this.getDisplayExpr}
              searchExpr={['FirstName', 'LastName', 'Prefix']}
              valueExpr={'ID'}
              placeholder={'Select employee'}
              title={'Select employee'}
              itemComponent={Item} />
          </div>
        </div>
      </div>
    );
  }
  getDisplayExpr(item) {
    return item ? `${item.FirstName} ${item.LastName}` : '';
  }
}

export default App;
