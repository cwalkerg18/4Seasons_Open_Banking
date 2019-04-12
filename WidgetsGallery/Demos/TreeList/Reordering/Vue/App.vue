<template>
  <div>
    <dx-tree-list
      id="employees"
      :data-source="employees"
      :allow-column-reordering="true"
      :show-row-lines="true"
      :show-borders="true"
      :column-auto-width="true"
      :expanded-row-keys="expandedRowKeys"
      key-expr="ID"
      parent-id-expr="Head_ID"
    >
      <dx-column
        :allow-reordering="false"
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
