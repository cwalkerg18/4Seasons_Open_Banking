<template>
  <div>
    <dx-tree-list
      id="employees"
      :data-source="employees"
      :expanded-row-keys="expandedRowKeys"
      :filter-value="filterValue"
      :show-borders="true"
      key-expr="ID"
      parent-id-expr="Head_ID"
    >
      <dx-filter-row
        :visible="true"
      />
      <dx-filter-panel
        :visible="true"
      />
      <dx-header-filter
        :visible="true"
      />
      <dx-column
        data-field="Full_Name"
        data-type="string"
      />
      <dx-column
        data-field="Title"
        caption="Position"
        data-type="string"
      />
      <dx-column
        data-field="City"
        data-type="string"
      />
      <dx-column
        data-field="State"
        data-type="string"
      />
      <dx-column
        data-field="Mobile_Phone"
        data-type="string"
      />
      <dx-column
        data-field="Hire_Date"
        data-type="date"
      />
    </dx-tree-list>
  </div>
</template>
<script>
import { employees } from './data.js';
import { DxTreeList, DxFilterRow, DxFilterPanel, DxHeaderFilter, DxColumn } from 'devextreme-vue/tree-list';

export default {
  components: {
    DxTreeList, DxFilterRow, DxFilterPanel, DxHeaderFilter, DxColumn
  },
  data() {
    return {
      employees: employees,
      expandedRowKeys: [1],
      filterValue: ['City', '=', 'Bentonville']
    };
  }
};
</script>
<style scoped>
.demo-container {
    height: 570px;
}

#employees {
    height: 440px;
}
</style>
