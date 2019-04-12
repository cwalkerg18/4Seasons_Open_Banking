import React from 'react';
import { SelectBox } from 'devextreme-react/select-box';
import DataSource from 'devextreme/data/data_source';
import Group from './Group.js';

import productsData from './data.js';

const products = new DataSource({
  store: productsData,
  key: 'ID',
  group: 'Category'
});

class App extends React.Component {
  render() {
    return (
      <div className={'dx-fieldset'}>
        <div className={'dx-field'}>
          <div className={'dx-field-label'}>Grouped items</div>
          <div className={'dx-field-value'}>
            <SelectBox
              dataSource={products}
              valueExpr={'ID'}
              defaultValue={productsData[16].ID}
              grouped={true}
              displayExpr={'Name'} />
          </div>
        </div>

        <div className={'dx-field'}>
          <div className={'dx-field-label'}>Grouped items with search enabled</div>
          <div className={'dx-field-value'}>
            <SelectBox
              dataSource={products}
              valueExpr={'ID'}
              defaultValue={productsData[17].ID}
              searchEnabled={true}
              grouped={true}
              displayExpr={'Name'} />
          </div>
        </div>

        <div className={'dx-field'}>
          <div className={'dx-field-label'}>Grouped items with a custom group template</div>
          <div className={'dx-field-value'}>
            <SelectBox
              dataSource={products}
              valueExpr={'ID'}
              defaultValue={productsData[18].ID}
              grouped={true}
              displayExpr={'Name'}
              groupComponent={Group} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
