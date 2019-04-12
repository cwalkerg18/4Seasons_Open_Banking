<template>
  <dx-data-grid
    id="gridContainer"
    :data-source="dataSource"
    :show-borders="true"
  >
    <dx-column
      :width="90"
      data-field="Task_ID"
    />
    <dx-column
      :width="190"
      data-field="Task_Subject"
      caption="Subject"
    />
    <dx-column
      :group-index="0"
      data-field="Task_Status"
      caption="Status"
    />
    <dx-column
      :group-index="1"
      data-field="Task_Priority"
      caption="Priority"
    >
      <dx-lookup
        :data-source="priority"
        value-expr="value"
        display-expr="name"
      />
    </dx-column>
    <dx-column
      :allow-sorting="false"
      :allow-grouping="false"
      data-field="ResponsibleEmployee.Employee_Full_Name"
      caption="Assigned To"
    />
    <dx-column
      data-field="Task_Start_Date"
      data-type="date"
      caption="Start Date"
    />
    <dx-column
      data-field="Task_Due_Date"
      data-type="date"
      caption="Due Date"
    />
    <dx-group-panel :visible="true"/>
    <dx-scrolling mode="virtual"/>
  </dx-data-grid>
</template>
<script>
import {
  DxDataGrid,
  DxColumn,
  DxGroupPanel,
  DxScrolling,
  DxLookup
} from 'devextreme-vue/data-grid';
import 'devextreme/data/odata/store';

export default {
  components: {
    DxDataGrid,
    DxColumn,
    DxGroupPanel,
    DxScrolling,
    DxLookup
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
          'Task_Due_Date',
          'Task_Status',
          'Task_Priority',
          'ResponsibleEmployee/Employee_Full_Name'
        ]
      },
      priority: [
        { name: 'High', value: 4 },
        { name: 'Urgent', value: 3 },
        { name: 'Normal', value: 2 },
        { name: 'Low', value: 1 }
      ]
    };
  }
};
</script>
<style scoped>
#gridContainer {
  height: 420px;
}
</style>
