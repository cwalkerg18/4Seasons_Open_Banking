<template>
  <div>
    <div id="descContainer">
      Sort and filter data, reorder and resize columns, select and expand rows. Once you are done,
      <a onclick="window.location.reload()">refresh</a>
      the web page to see that the grid’s state is automatically persisted to continue working from where you stopped.
    </div>
    <dx-tree-list
      id="employees"
      :data-source="employees"
      :allow-column-reordering="true"
      :allow-column-resizing="true"
      :show-borders="true"
      :expanded-row-keys="expandedRowKeys"
      key-expr="ID"
      parent-id-expr="Head_ID"
    >
      <dx-selection
        :recursive="true"
        mode="multiple"
      />
      <dx-filter-row
        :visible="true"
      />
      <dx-state-storing
        :enabled="true"
        type="localStorage"
        storage-key="treeListStorage"
      />
      <dx-column
        data-field="Full_Name"
      />
      <dx-column
        data-field="Title"
        caption="Position"
      />
      <dx-column
        data-field="City"
      />
      <dx-column
        :width="160"
        data-field="Hire_Date"
        data-type="date"
      />
    </dx-tree-list>
  </div>
</template>
<script>
import { employees } from './data.js';
import { DxTreeList, DxSelection, DxFilterRow, DxStateStoring, DxColumn } from 'devextreme-vue/tree-list';

export default {
  components: {
    DxTreeList, DxSelection, DxFilterRow, DxStateStoring, DxColumn
  },
  data() {
    return {
      employees: employees,
      expandedRowKeys: [1, 2, 10]
    };
  }
};
</script>
<style scoped>
#employees {
    height: 440px;
    margin-top: 30px;
}

#descContainer  a {
    color: #f05b41;
    text-decoration: underline;
    cursor: pointer;
}

#descContainer  a:hover {
    text-decoration: none;
}
</style>
