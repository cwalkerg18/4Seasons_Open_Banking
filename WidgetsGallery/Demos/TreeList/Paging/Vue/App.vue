<template>
  <div>
    <dx-tree-list
      id="tasks"
      :data-source="tasks"
      :auto-expand-all="true"
      :column-auto-width="true"
      :show-borders="true"
      key-expr="Task_ID"
      parent-id-expr="Task_Parent_ID"
    >
      <dx-scrolling
        mode="standard"
      />
      <dx-paging
        :enabled="true"
        :page-size="10"
      />
      <dx-pager
        :show-page-size-selector="true"
        :allowed-page-sizes="allowedPageSizes"
        :show-info="true"
      />
      <dx-column
        :width="390"
        data-field="Task_Subject"
      />
      <dx-column
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
        data-field="Task_Status"
        caption="Status"
      >
        <dx-lookup
          :data-source="statuses"
        />
      </dx-column>
      <dx-column
        :width="100"
        data-field="Task_Start_Date"
        caption="Start Date"
        data-type="date"
      />
      <dx-column
        :width="100"
        data-field="Task_Due_Date"
        caption="Due Date"
        data-type="date"
      />
    </dx-tree-list>
  </div>
</template>
<script>
import { tasks, employees } from './data.js';
import { DxTreeList, DxScrolling, DxPaging, DxPager, DxColumn, DxLookup } from 'devextreme-vue/tree-list';

export default {
  components: {
    DxTreeList, DxScrolling, DxPaging, DxPager, DxColumn, DxLookup
  },
  data() {
    return {
      tasks: tasks,
      employees: employees,
      allowedPageSizes: [5, 10, 20],
      statuses: [
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
