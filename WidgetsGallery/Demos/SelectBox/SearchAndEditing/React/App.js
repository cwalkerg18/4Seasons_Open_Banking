import React from 'react';
import { SelectBox } from 'devextreme-react/select-box';

import { simpleProducts, products } from './data.js';

class App extends React.Component {
  constructor() {
    super();

    this.state = { editBoxValue: simpleProducts[0] };
    this.valueChanged = ({ value }) => this.setState({ editBoxValue: value });
  }
  customItemCreating(args) {
    const item = args.text;
    const dataSource = args.component.getDataSource();

    args.customItem = item || '';

    if(item) {
      dataSource
        .store()
        .load({ filter: ['this', '=', item] })
        .done((items) => {
          if(!items.length) {
            dataSource.store().insert(item);
            dataSource.reload();
          }
        });
    }
  }

  render() {
    return (
      <div>
        <div className={'dx-fieldset'}>
          <div className={'dx-fieldset-header'}>SearchBox mode</div>
          <div className={'dx-field'}>
            <div className={'dx-field-label'}>Product</div>
            <div className={'dx-field-value'}>
              <SelectBox displayExpr={'Name'}
                valueExpr={'ID'}
                searchEnabled={true}
                items={products} />
            </div>
          </div>
        </div>
        <div className={'dx-fieldset'}>
          <div className={'dx-fieldset-header'}>EditBox mode</div>
          <div className={'dx-field'}>
            <div className={'dx-field-label'}>Product</div>
            <div className={'dx-field-value'}>
              <SelectBox acceptCustomValue={true}
                defaultValue={this.state.editBoxValue}
                items={simpleProducts}
                onCustomItemCreating={this.customItemCreating}
                onValueChanged={this.valueChanged} />
            </div>
          </div>
          <div className={'dx-field current-product'}>
            Current product is <span className={'current-value'}>{this.state.editBoxValue}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
