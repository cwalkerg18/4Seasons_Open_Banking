<template>
  <div>
    <dx-data-grid
      id="gridContainer"
      :data-source="employees"
      :show-borders="true"
    >
      <dx-column
        :width="100"
        :allow-sorting="false"
        data-field="Picture"
        cell-template="cellTemplate"
      />
      <dx-column
        :width="70"
        data-field="Prefix"
        caption="Title"
      />
      <dx-column data-field="FirstName"/>
      <dx-column data-field="LastName"/>
      <dx-column data-field="Position"/>
      <dx-column
        data-field="BirthDate"
        data-type="date"
      />
      <dx-column
        data-field="HireDate"
        data-type="date"
      />
      <div
        slot="cellTemplate"
        slot-scope="data"
      >
        <img :src="data.value">
      </div>
    </dx-data-grid>
  </div>
</template>
<script>
import { DxDataGrid, DxColumn } from 'devextreme-vue/data-grid';

import service from './data.js';

export default {
  components: {
    DxDataGrid,
    DxColumn
  },
  data() {
    return {
      employees: service.getEmployees()
    };
  }
};
</script>
<style scoped>
#gridContainer {
  height: 440px;
}

img {
  height: 100px;
  display: block;
}
</style>
