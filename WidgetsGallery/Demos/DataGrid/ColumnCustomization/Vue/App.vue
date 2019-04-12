<template>
  <div>
    <dx-data-grid
      id="gridContainer"
      :data-source="employees"
      :allow-column-reordering="true"
      :allow-column-resizing="true"
      :column-auto-width="true"
      :show-borders="true"
    >
      <dx-column-chooser :enabled="true"/>
      <dx-column-fixing :enabled="true"/>
      <dx-column
        :width="230"
        :fixed="true"
        :calculate-cell-value="calculateCellValue"
        caption="Employee"
      />
      <dx-column
        data-field="BirthDate"
        data-type="date"
      />
      <dx-column
        data-field="HireDate"
        data-type="date"
      />
      <dx-column
        data-field="Position"
        alignment="right"
      />
      <dx-column
        :width="230"
        data-field="Address"
      />
      <dx-column data-field="City"/>
      <dx-column data-field="State"/>
      <dx-column
        :visible="false"
        data-field="Zipcode"
      />
      <dx-column data-field="HomePhone"/>
      <dx-column data-field="MobilePhone"/>
      <dx-column data-field="Skype"/>
      <dx-column data-field="Email"/>
    </dx-data-grid>
  </div>
</template>
<script>
import {
  DxDataGrid,
  DxColumn,
  DxColumnChooser,
  DxColumnFixing
} from 'devextreme-vue/data-grid';

import service from './data.js';

export default {
  components: {
    DxDataGrid,
    DxColumn,
    DxColumnChooser,
    DxColumnFixing
  },
  data() {
    return {
      employees: service.getEmployees()
    };
  },
  methods: {
    calculateCellValue(data) {
      return [data.Title, data.FirstName, data.LastName].join(' ');
    }
  }
};
</script>
<style scoped>
#gridContainer {
  height: 440px;
}
</style>
