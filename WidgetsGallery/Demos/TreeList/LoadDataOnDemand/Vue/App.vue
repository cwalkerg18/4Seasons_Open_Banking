<template>
  <div>
    <dx-tree-list
      id="treelist"
      :data-source="dataSource"
      :show-borders="true"
      key-expr="id"
      parent-id-expr="parentId"
      has-items-expr="hasItems"
      root-value=""
    >
      <dx-remote-operations
        :filtering="true"
      />
      <dx-column
        data-field="name"
      />
      <dx-column
        :width="100"
        :customize-text="customizeText"
        data-field="size"
      />
      <dx-column
        :width="150"
        data-field="createdDate"
        data-type="date"
      />
      <dx-column
        :width="150"
        data-field="modifiedDate"
        data-type="date"
      />
    </dx-tree-list>
  </div>
</template>
<script>
import { DxTreeList, DxRemoteOperations, DxColumn } from 'devextreme-vue/tree-list';
import 'whatwg-fetch';

export default {
  components: {
    DxTreeList, DxRemoteOperations, DxColumn
  },
  data() {
    return {
      dataSource: {
        load: function(loadOptions) {
          let parentIdsParam = loadOptions.parentIds.join(',');

          return fetch(`http://jsserver.corp.devexpress.com:81/Demos-18.2/Mvc/api/treeListData?parentIds=${parentIdsParam}`)
            .then(response => response.json())
            .catch(() => { throw 'Data Loading Error'; });
        }
      }
    };
  },
  methods: {
    customizeText(e) {
      if(e.value !== null) {
        return `${Math.ceil(e.value / 1024) } KB`;
      }
    }
  }
};

</script>
<style scoped>
#treelist {
    max-height: 440px;
}
</style>
