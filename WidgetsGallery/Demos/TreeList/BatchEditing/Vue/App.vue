<template>
  <div>
    <div id="tree-list-demo">
      <dx-tree-list
        id="tasks"
        :data-source="tasks"
        :column-auto-width="true"
        :word-wrap-enabled="true"
        :show-borders="true"
        key-expr="Task_ID"
        parent-id-expr="Task_Parent_ID"
        @init-new-row="onInitNewRow"
      >
        <dx-editing
          :allow-adding="true"
          :allow-updating="true"
          :allow-deleting="true"
          mode="batch"
        />
        <dx-column
          :min-width="250"
          data-field="Task_Subject"
        >
          <dx-required-rule/>
        </dx-column>
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
          <dx-required-rule/>
        </dx-column>
        <dx-column
          :min-width="120"
          data-field="Task_Status"
          caption="Status"
        >
          <dx-lookup
            :data-source="statuses"
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
  </div>
</template>
<script>
import { tasks, employees } from './data.js';
import { DxTreeList, DxEditing, DxColumn, DxRequiredRule, DxLookup } from 'devextreme-vue/tree-list';

export default {
  components: {
    DxTreeList, DxEditing, DxColumn, DxRequiredRule, DxLookup
  },
  data() {
    return {
      tasks: tasks,
      employees: employees,
      statuses: [
        'Not Started',
        'Need Assistance',
        'In Progress',
        'Deferred',
        'Completed'
      ]
    };
  },
  methods: {
    onInitNewRow(e) {
      e.data.Task_Status = 'Not Started';
      e.data.Task_Start_Date = new Date();
      e.data.Task_Due_Date = new Date();
    }
  }
};
</script>
<style scoped>
#tree-list-demo {
    min-height: 700px;
}

#tasks {
    max-height: 700px;
}
</style>
