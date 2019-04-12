<template>
  <div>
    <dx-tree-list
      id="employees"
      :data-source="employees"
      :expanded-row-keys="expandedRowKeys"
      :show-row-lines="true"
      :show-borders="true"
      :column-auto-width="true"
      items-expr="items"
      data-structure="tree"
    >
      <dx-column
        data-field="Title"
        caption="Position"
      />
      <dx-column
        data-field="Full_Name"
      />
      <dx-column
        data-field="City"
      />
      <dx-column
        data-field="State"
      />
      <dx-column
        data-field="Mobile_Phone"
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
import { DxTreeList, DxColumn } from 'devextreme-vue/tree-list';

export default {
  components: {
    DxTreeList, DxColumn
  },
  data() {
    return {
      employees: employees,
      expandedRowKeys: [1]
    };
  }
};
</script>
<style scoped>
#employees {
    max-height: 440px;
}
</style>
