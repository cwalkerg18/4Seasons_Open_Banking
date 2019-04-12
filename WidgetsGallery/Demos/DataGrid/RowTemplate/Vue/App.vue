<template>
  <div>
    <dx-data-grid
      id="gridContainer"
      :data-source="employees"
      :column-auto-width="true"
      :show-borders="true"
      row-template="dataRowTemplate"
    >
      <dx-column
        :width="100"
        :allow-filtering="false"
        :allow-sorting="false"
        caption="Photo"
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
      <tbody
        slot="dataRowTemplate"
        slot-scope="rowInfo"
        class="employee dx-row"
      >
        <tr class="main-row">
          <td rowspan="2"><img :src="rowInfo.data.Picture"></td>
          <td>{{ rowInfo.data.Prefix }}</td>
          <td>{{ rowInfo.data.FirstName }}</td>
          <td>{{ rowInfo.data.LastName }}</td>
          <td>{{ rowInfo.data.Position }}</td>
          <td>{{ rowInfo.data.BirthDate | formatDate("yyyy/MM/dd") }}</td>
          <td>{{ rowInfo.data.HireDate | formatDate("yyyy/MM/dd") }}</td>
        </tr>
        <tr class="notes-row">
          <td colspan="6"><div>{{ rowInfo.data.Notes }}</div></td>
        </tr>
      </tbody>
    </dx-data-grid>
  </div>
</template>
<script>
import {
  DxDataGrid,
  DxColumn
} from 'devextreme-vue/data-grid';
import Globalize from 'globalize';
import 'devextreme/localization/globalize/date';

import service from './data.js';

export default {
  components: {
    DxDataGrid,
    DxColumn
  },
  filters: {
    formatDate(value, format) {
      return Globalize.formatDate(new Date(value), { raw: format });
    }
  },
  data() {
    return {
      employees: service.getEmployees()
    };
  },
};
</script>
<style scoped>
#gridContainer {
    height: 450px;
}

.dx-row img {
    height: 100px;
}

#gridContainer tr.main-row td:not(:first-child) {
    height: 21px;
}

#gridContainer tr.notes-row {
    white-space: normal;
    vertical-align: top;
}

#gridContainer tr.notes-row td {
    height: 70px;
    color: #999;
}

.dark #gridContainer tr.notes-row td {
    color: #777;
}

#gridContainer tbody.employee:hover {
    background-color: #EBEBEB;
}

.dark #gridContainer tbody.employee:hover {
    background-color: #484848;
}

#gridContainer tbody.employee:hover tr.main-row td {
    color: #000;
}

.dark #gridContainer tbody.employee:hover tr.main-row td {
    color: #CCC;
}

#gridContainer tbody.employee:hover tr.notes-row td {
    color: #888;
}
</style>
