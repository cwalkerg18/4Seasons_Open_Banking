<template>
  <div>
    <dx-data-grid
      :data-source="employees"
      :selection="{ mode: 'single' }"
      :show-borders="true"
      :hover-state-enabled="true"
      key-expr="ID"
      @selection-changed="onSelectionChanged"
    >
      <dx-column
        :width="70"
        data-field="Prefix"
        caption="Title"
      />
      <dx-column data-field="FirstName"/>
      <dx-column data-field="LastName"/>
      <dx-column
        :width="180"
        data-field="Position"
      />
      <dx-column
        data-field="BirthDate"
        data-type="date"
      />
      <dx-column
        data-field="HireDate"
        data-type="date"
      />
    </dx-data-grid>
    <div
      v-if="showEmployeeInfo"
      id="employee-info"
    >
      <img
        :src="selectedRowPicture"
        class="employee-photo"
      >
      <p class="employee-notes">{{ selectedRowNotes }}</p>
    </div>
  </div>
</template>
<script>
import { DxDataGrid, DxColumn } from 'devextreme-vue/data-grid';
import { employees } from './data.js';

export default {
  components: {
    DxDataGrid,
    DxColumn
  },
  data() {
    return {
      showEmployeeInfo: false,
      selectedRowNotes: '',
      selectedRowPicture: '',
      employees
    };
  },
  methods: {
    onSelectionChanged({ selectedRowsData }) {
      const data = selectedRowsData[0];

      this.showEmployeeInfo = !!data;
      this.selectedRowNotes = data && data.Notes;
      this.selectedRowPicture = data && data.Picture;
    }
  }
};
</script>
<style scoped>
#employee-info .employee-photo {
  height: 100px;
  float: left;
  padding: 20px;
}
#employee-info .employee-notes {
  padding-top: 20px;
  text-align: justify;
}
.dark #employee-info .employee-notes {
  color: rgb(181, 181, 181);
}
</style>
