<template>
  <dx-tree-list
    id="tasks"
    :data-source="dataSource"
    :show-borders="true"
    :column-auto-width="true"
    :word-wrap-enabled="true"
    :expanded-row-keys="expandedRowKeys"
    :selected-row-keys="selectedRowKeys"
    key-expr="Task_ID"
    parent-id-expr="Task_Parent_ID"
  >

    <dx-search-panel
      :visible="true"
      :width="250"
    />
    <dx-header-filter :visible="true"/>
    <dx-selection mode="multiple"/>
    <dx-column-chooser :enabled="true"/>

    <dx-column
      :width="300"
      data-field="Task_Subject"
    />
    <dx-column
      :allow-sorting="true"
      :min-width="200"
      data-field="Task_Assigned_Employee_ID"
      caption="Assigned"
      cell-template="employeeTemplate"
    >
      <dx-lookup
        :data-source="employees"
        value-expr="ID"
        display-expr="Name"
      />
    </dx-column>
    <dx-column
      :min-width="100"
      data-field="Task_Status"
      caption="Status"
    >
      <dx-lookup :data-source="statuses"/>
    </dx-column>
    <dx-column
      :visible="false"
      data-field="Task_Priority"
      caption="Priority"
    >
      <dx-lookup
        :data-source="priorities"
        value-expr="id"
        display-expr="value"
      />
    </dx-column>
    <dx-column
      :min-width="100"
      :customize-text="customizeTaskCompletionText"
      :visible="false"
      data-field="Task_Completion"
      caption="% Completed"
    />
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
    <employee-cell
      slot="employeeTemplate"
      slot-scope="options"
      :cell-data="options.data"
    />
  </dx-tree-list>
</template>
<script>

import {
  DxTreeList,
  DxColumn,
  DxColumnChooser,
  DxHeaderFilter,
  DxSearchPanel,
  DxSelection,
  DxLookup
} from 'devextreme-vue/tree-list';

import { tasks, employees, priorities } from './data.js';
import EmployeeCell from './EmployeeCell.vue';

const statuses = [
  'Not Started',
  'Need Assistance',
  'In Progress',
  'Deferred',
  'Completed'
];

export default {
  components: {
    DxTreeList,
    DxColumn,
    DxColumnChooser,
    DxHeaderFilter,
    DxSearchPanel,
    DxSelection,
    DxLookup,
    EmployeeCell
  },
  data() {
    return {
      expandedRowKeys: [1, 2],
      selectedRowKeys: [1, 29, 42],
      employees,
      priorities,
      statuses
    };
  },
  computed: {
    dataSource() {
      return tasks.map(function(task) {
        employees.forEach(function(employee) {
          if (task.Task_Assigned_Employee_ID === employee.ID) {
            task.Task_Assigned_Employee = employee;
          }
        });
        return task;
      });
    }
  },
  methods: {
    customizeTaskCompletionText(cellInfo) {
      return `${cellInfo.valueText}%`;
    }
  },
};
</script>
<style>
#tasks {
    max-height: 540px;
}
#tasks .dx-treelist-rowsview td {
    vertical-align: middle;
}
</style>
