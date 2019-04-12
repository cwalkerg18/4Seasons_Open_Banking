<template>
  <div>
    <div class="left-side">
      <div class="logo">
        <img src="../../../../images/logo-devav.png">
        <img src="../../../../images/logo-tasks.png">
      </div>
    </div>
    <div class="right-side">
      <dx-select-box
        :items="statuses"
        :value="statuses[0]"
        @value-changed="onValueChanged"
      />
    </div>

    <dx-data-grid
      id="gridContainer"
      :ref="dataGridRefName"
      :data-source="dataSource"
      :column-auto-width="true"
      :show-borders="true"
    >
      <dx-column
        :width="80"
        data-field="Task_ID"
      />
      <dx-column
        data-field="Task_Start_Date"
        data-type="date"
        caption="Start Date"
      />
      <dx-column
        :allow-sorting="false"
        data-field="ResponsibleEmployee.Employee_Full_Name"
        css-class="employee"
        caption="Assigned To"
      />
      <dx-column
        :width="350"
        data-field="Task_Subject"
        caption="Subject"
      />
      <dx-column
        data-field="Task_Status"
        caption="Status"
      />
    </dx-data-grid>
  </div>
</template>
<script>
import {
  DxColumn,
  DxDataGrid
} from 'devextreme-vue/data-grid';
import { DxSelectBox } from 'devextreme-vue';
import 'devextreme/data/odata/store';

export default {
  components: {
    DxSelectBox,
    DxColumn,
    DxDataGrid
  },
  data() {
    return {
      dataSource: {
        store: {
          type: 'odata',
          url: 'https://js.devexpress.com/Demos/DevAV/odata/Tasks'
        },
        expand: 'ResponsibleEmployee',
        select: [
          'Task_ID',
          'Task_Subject',
          'Task_Start_Date',
          'Task_Status',
          'ResponsibleEmployee/Employee_Full_Name'
        ]
      },
      statuses: ['All', 'Not Started', 'In Progress', 'Need Assistance', 'Deferred', 'Completed'],
      dataGridRefName: 'dataGrid',
    };
  },
  methods: {
    onValueChanged({ value }) {
      const dataGrid = this.$refs[this.dataGridRefName].instance;

      if (value === 'All') {
        dataGrid.clearFilter();
      }
      else {
        dataGrid.filter(['Task_Status', '=', value]);
      }
    }
  }
};
</script>
<style scoped>
.right-side {
  position: absolute;
  right: 1px;
  top: 6px;
}

.logo {
  line-height: 48px;
}

.logo img {
  vertical-align: middle;
  margin: 0 5px;
}

.dx-row.dx-data-row .employee {
  color: #bf4e6a;
  font-weight: bold;
}

#gridContainer {
  margin: 20px 0;
  height: 400px;
}
</style>
