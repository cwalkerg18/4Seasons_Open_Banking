<template>
  <dx-data-grid
    id="grid-container"
    :show-borders="true"
    :data-source="dataSource"
    key-expr="ID"
    @selection-changed="selectionChanged"
    @content-ready="contentReady"
  >
    <dx-selection mode="single"/>
    <dx-column
      :width="70"
      data-field="Prefix"
      caption="Title"
    />
    <dx-column data-field="FirstName"/>
    <dx-column data-field="LastName"/>
    <dx-column
      :width="170"
      data-field="Position"
    />
    <dx-column
      :width="125"
      data-field="State"
    />
    <dx-column
      data-field="BirthDate"
      data-type="date"
    />
    <dx-master-detail
      :enabled="false"
      template="detailTemplate"
    />
    <div
      slot="detailTemplate"
      slot-scope="employee"
    >
      <div class="employee-info">
        <img
          :src="employee.data.Picture"
          class="employee-photo"
        >
        <p class="employee-notes">{{ employee.data.Notes }}</p>
      </div>
    </div>
  </dx-data-grid>
</template>
<script>

import DxDataGrid, {
  DxColumn,
  DxMasterDetail,
  DxSelection
} from 'devextreme-vue/data-grid';
import { employees } from './data.js';

export default {
  components: {
    DxDataGrid,
    DxColumn,
    DxMasterDetail,
    DxSelection
  },
  data() {
    return {
      dataSource: employees
    };
  },
  methods: {
    contentReady(e) {
      if (!e.component.getSelectedRowKeys().length)
      { e.component.selectRowsByIndexes(0); }
    },
    selectionChanged(e) {
      e.component.collapseAll(-1);
      e.component.expandRow(e.currentSelectedRowKeys[0]);
    }
  }
};
</script>
<style>
#grid-container {
  height: 440px;
}

#grid-container .dx-datagrid-content tr.dx-data-row {
  cursor: pointer;
}

.employee-info .employee-photo {
  height: 140px;
  float: left;
  padding: 20px 20px 20px 0;
}

.employee-info .employee-notes {
  padding-top: 20px;
  text-align: justify;
  white-space: normal;
}
</style>
