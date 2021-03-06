import React from 'react';

import List from 'devextreme-react/list.js';
import { navigation } from './data.js';

class NavigationList extends React.PureComponent {
  render() {
    return (
      <div className={'list'}>
        <List
          dataSource={navigation}
          hoverStateEnabled={false}
          activeStateEnabled={false}
          focusStateEnabled={false}
          elementAttr={{ class: 'panel-list dx-theme-accent-as-background-color' }}
          width={200} />
      </div>
    );
  }
}

export default NavigationList;
