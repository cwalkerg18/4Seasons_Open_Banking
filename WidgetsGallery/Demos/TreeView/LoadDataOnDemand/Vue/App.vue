<template>
  <div>
    <dx-tree-view
      :create-children="createChildren"
      :root-value="''"
      :height="500"
      data-structure="plain"
    />
  </div>
</template>
<script>

import DxTreeView from 'devextreme-vue/tree-view';

import { folderStructure } from './data.js';

export default {
  components: {
    DxTreeView
  },
  data() {
    return {
      folderStructure: folderStructure
    };
  },
  methods: {
    createChildren: function(parent) {
      let parentId = parent ? parent.itemData.id : '',
        fileNames = this.folderStructure[parentId];

      if (!fileNames) return [];

      return fileNames.map(fileName => {
        let fullName = parentId ? `${parentId }\\${ fileName}` : fileName;
        return {
          id: fullName,
          parentId: parentId,
          text: fileName,
          hasItems: !!this.folderStructure[fullName]
        };
      });
    }
  }
};
</script>
