<template>
  <div>
    <dx-data-grid
      id="gridContainer"
      :data-source="dataSource"
      :show-borders="true"
    >
      <dx-export
        :enabled="true"
        :allow-export-selected-data="true"
        file-name="Employees"
      />
      <dx-selection mode="multiple"/>
      <dx-group-panel :visible="true"/>
      <dx-column
        :width="60"
        data-field="Prefix"
        caption="Title"
      />
      <dx-column data-field="FirstName"/>
      <dx-column data-field="LastName"/>
      <dx-column data-field="City"/>
      <dx-column data-field="State"/>
      <dx-column
        :width="130"
        data-field="Position"
      />
      <dx-column
        :width="100"
        data-field="BirthDate"
        data-type="date"
      />
      <dx-column
        :width="100"
        data-field="HireDate"
        data-type="date"
      />
    </dx-data-grid>
  </div>
</template>
<script>
import { DxDataGrid, DxColumn, DxExport, DxSelection, DxGroupPanel } from 'devextreme-vue/data-grid';
import service from './data.js';

export default {
  components: {
    DxDataGrid, DxColumn, DxExport, DxSelection, DxGroupPanel
  },
  data() {
    return {
      dataSource: service.getEmployees()
    };
  }
};
</script>
