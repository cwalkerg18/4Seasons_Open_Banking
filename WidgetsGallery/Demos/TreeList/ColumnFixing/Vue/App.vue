<template>
  <div>
    <dx-tree-list
      id="employees"
      :data-source="employees"
      :column-auto-width="true"
      :show-row-lines="true"
      :show-borders="true"
      :expanded-row-keys="expandedRowKeys"
      key-expr="ID"
      parent-id-expr="Head_ID"
    >
      <dx-column
        data-field="Title"
        caption="Position"
      />
      <dx-column
        :fixed="true"
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
        data-field="Email"
      />
      <dx-column
        data-field="Hire_Date"
        data-type="date"
      />
      <dx-column
        data-field="Birth_Date"
        data-type="date"
      />
      <dx-column
        data-field="Skype"
      />
      <dx-column-fixing
        :enabled="true"
      />
    </dx-tree-list>
  </div>
</template>
<script>
import { employees } from './data.js';
import { DxTreeList, DxColumn, DxColumnFixing } from 'devextreme-vue/tree-list';

export default {
  components: {
    DxTreeList, DxColumn, DxColumnFixing
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
    max-height: 440px;
}
</style>
