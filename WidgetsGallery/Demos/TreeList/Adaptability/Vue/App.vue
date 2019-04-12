<template>
  <div>
    <dx-tree-list
      id="employees"
      :data-source="employees"
      :show-borders="true"
      :column-hiding-enabled="true"
      :show-row-lines="true"
      :expanded-row-keys="expandedRowKeys"
      key-expr="ID"
      parent-id-expr="Head_ID"
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
        :hiding-priority="0"
        data-field="State"
      />
      <dx-column
        :hiding-priority="1"
        data-field="Mobile_Phone"
      />
      <dx-column
        :hiding-priority="2"
        data-field="Hire_Date"
        data-type="date"
      />
      <dx-column-chooser
        :enabled="true"
        mode="select"
      />
    </dx-tree-list>
  </div>
</template>
<script>
import { employees } from './data.js';
import { DxTreeList, DxColumn, DxColumnChooser } from 'devextreme-vue/tree-list';

export default {
  components: {
    DxTreeList, DxColumn, DxColumnChooser
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
    padding: 10px;
}
</style>
