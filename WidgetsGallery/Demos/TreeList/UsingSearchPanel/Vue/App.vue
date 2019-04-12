<template>
  <div>
    <dx-tree-list
      id="tasks"
      :data-source="tasks"
      :column-auto-width="true"
      :word-wrap-enabled="true"
      :show-borders="true"
      key-expr="Task_ID"
      parent-id-expr="Task_Parent_ID"
    >
      <dx-search-panel
        :visible="true"
      />
      <dx-column
        :min-width="300"
        data-field="Task_Subject"
      />
      <dx-column
        :min-width="120"
        data-field="Task_Assigned_Employee_ID"
        caption="Assigned"
      >
        <dx-lookup
          :data-source="employees"
          value-expr="ID"
          display-expr="Name"
        />
      </dx-column>
      <dx-column
        :min-width="120"
        data-field="Task_Status"
        caption="Status"
      >
        <dx-lookup
          :data-source="dataSource"
        />
      </dx-column>
      <dx-column
        data-field="Task_Start_Date"
        caption="Start Date"
        data-type="date"
      />
      <dx-column
        data-field="Task_Due_Date"
        caption="Due Date"
        data-type="date"
      />
    </dx-tree-list>
  </div>
</template>
<script>
import { tasks, employees } from './data.js';
import { DxTreeList, DxSearchPanel, DxColumn, DxLookup } from 'devextreme-vue/tree-list';

export default {
  components: {
    DxTreeList, DxSearchPanel, DxColumn, DxLookup
  },
  data() {
    return {
      tasks: tasks,
      employees: employees,
      dataSource: [
        'Not Started',
        'Need Assistance',
        'In Progress',
        'Deferred',
        'Completed'
      ]
    };
  }
};
</script>
<style scoped>
#tasks {
    max-height: 440px;
}
</style>
