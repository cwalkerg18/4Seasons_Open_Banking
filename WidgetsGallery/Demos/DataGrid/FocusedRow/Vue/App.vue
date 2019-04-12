<template>
  <div>
    <dx-data-grid
      id="gridContainer"
      :ref="dataGridRefName"
      :data-source="dataSource"
      :columns="columns"
      :show-borders="true"
      :focused-row-enabled="true"
      :focused-row-key.sync="focusedRowKey"
      @focused-row-changing="onFocusedRowChanging"
      @focused-row-changed="onFocusedRowChanged"
    >
      <dx-paging :page-size="10"/>
    </dx-data-grid>

    <div class="task-info">
      <div class="info">
        <div id="taskSubject">{{ taskSubject }}</div>
        <p
          id="taskDetails"
          v-html="taskDetails"
        />
      </div>
      <div class="progress">
        <span id="taskStatus">{{ taskStatus }}</span>
        <span id="taskProgress">{{ taskProgress }}</span>
      </div>
    </div>

    <div class="options">
      <div class="caption">Options</div>
      <div class="option">
        <span>Focused row key</span>
        <dx-number-box
          id="taskId"
          :ref="taskIdEditorRefName"
          :min="1"
          :max="183"
          :step="0"
          :value="focusedRowKey"
          @value-changed="onTaskIdChanged"
        />
      </div>
    </div>
  </div>
</template>

<script>

import 'devextreme/data/odata/store';

import { DxDataGrid, DxPager, DxPaging } from 'devextreme-vue/data-grid';
import DxNumberBox from 'devextreme-vue/number-box';

const dataGridRefName = 'dataGrid';
const taskIdEditorRefName = 'taskIdEditor';

export default {
  components: {
    DxDataGrid,
    DxPager,
    DxPaging,
    DxNumberBox
  },
  data() {
    return {
      taskIdEditorRefName: taskIdEditorRefName,
      dataGridRefName: dataGridRefName,
      taskSubject: '',
      taskDetails: '',
      taskStatus: '',
      taskProgress: '',
      dataSource: {
        store: {
          type: 'odata',
          key: 'Task_ID',
          url: 'https://js.devexpress.com/Demos/DevAV/odata/Tasks'
        },
        expand: 'ResponsibleEmployee',
        select: [
          'Task_ID',
          'Task_Subject',
          'Task_Start_Date',
          'Task_Status',
          'Task_Description',
          'Task_Completion',
          'ResponsibleEmployee/Employee_Full_Name'
        ]
      },
      focusedRowKey: 117,
      columns: [
        {
          dataField: 'Task_ID',
          width: 80
        }, {
          caption: 'Start Date',
          dataField: 'Task_Start_Date',
          dataType: 'date'
        }, {
          caption: 'Assigned To',
          dataField: 'ResponsibleEmployee.Employee_Full_Name',
          cssClass: 'employee',
          allowSorting: false
        }, {
          caption: 'Subject',
          dataField: 'Task_Subject',
          width: 350
        }, {
          caption: 'Status',
          dataField: 'Task_Status'
        }
      ],
      isReady: false
    };
  },
  methods: {
    onFocusedRowChanging(e) {
      var pageSize = e.component.pageSize(),
        pageIndex = e.component.pageIndex(),
        isLoading = e.component.getController('data').isLoading();

      if(!isLoading) {
        if(e.event.key && e.prevRowIndex === e.newRowIndex) {
          if(e.newRowIndex === pageSize - 1) {
            e.component.pageIndex(pageIndex + 1).done(function() {
              e.component.option('focusedRowIndex', 0);
            });
          } else if(e.newRowIndex === 0) {
            e.component.pageIndex(pageIndex - 1).done(function() {
              e.component.option('focusedRowIndex', pageSize - 1);
            });
          }
        }
      }
    },
    onFocusedRowChanged: function(e) {
      var data = e.row.data;
      this.taskSubject = data.Task_Subject;
      this.taskDetails = data.Task_Description;
      this.taskStatus = data.Task_Status;
      this.taskProgress = e.row.data.Task_Completion ? `${e.row.data.Task_Completion }%` : '';
      this.focusedRowKey = e.component.option('focusedRowKey');
    },
    onTaskIdChanged(e) {
      if(e.event && e.value > 0) {
        this.focusedRowKey = e.value;
      }
    }
  }
};
</script>
