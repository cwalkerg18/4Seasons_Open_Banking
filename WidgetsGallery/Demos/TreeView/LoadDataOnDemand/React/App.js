import React from 'react';

import TreeView from 'devextreme-react/tree-view';
import { folderStructure } from './data.js';

class App extends React.Component {
  render() {

    return (
      <React.Fragment>
        <TreeView
          dataStructure={'plain'}
          rootValue={''}
          height={500}
          createChildren={this.createChildren}
        />
      </React.Fragment>
    );
  }
  createChildren(parent) {
    let parentId = parent ? parent.itemData.id : '',
      fileNames = folderStructure[parentId];

    if (!fileNames) return [];

    return fileNames.map((fileName) => {
      let fullName = parentId ? `${parentId }\\${ fileName}` : fileName;
      return {
        id: fullName,
        parentId: parentId,
        text: fileName,
        hasItems: !!folderStructure[fullName]
      };
    });
  }
}

export default App;
