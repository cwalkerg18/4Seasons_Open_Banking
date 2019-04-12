<template>
  <div id="data-grid-demo">
    <dx-data-grid
      :data-source="employees"
      :show-borders="true"
      key-expr="ID"
      @editorPreparing="onEditorPreparing"
    >
      <dx-editing
        :allow-updating="true"
        :allow-adding="true"
        mode="row"
      />
      <dx-column
        data-field="FirstName"
      />
      <dx-column
        data-field="LastName"
      />
      <dx-column
        data-field="Position"
      />
      <dx-column
        :set-cell-value="setStateValue"
        data-field="StateID"
        caption="State"
      >
        <dx-lookup
          :data-source="states"
          display-expr="Name"
          value-expr="ID"
        />
      </dx-column>
      <dx-column
        data-field="CityID"
        caption="City"
      >
        <dx-lookup
          :data-source="getFilteredCities"
          display-expr="Name"
          value-expr="ID"
        />
      </dx-column>
    </dx-data-grid>
  </div>
</template>
<script>
import { DxDataGrid, DxColumn, DxEditing, DxLookup } from 'devextreme-vue/data-grid';
import service from './data.js';

const employees = service.getEmployees();
const states = service.getStates();
const cities = service.getCities();

export default {
  components: {
    DxDataGrid,
    DxColumn,
    DxEditing,
    DxLookup
  },
  data() {
    return {
      employees,
      states,
      setStateValue(rowData, value) {
        rowData.CityID = null;
        this.defaultSetCellValue(rowData, value);
      }
    };
  },
  methods: {
    getFilteredCities: (options) => {
      return {
        store: cities,
        filter: options.data ? ['StateID', '=', options.data.StateID] : null
      };
    },
    onEditorPreparing(e) {
      if (e.parentType === 'dataRow' && e.dataField === 'CityID') {
        e.editorOptions.disabled = (typeof e.row.data.StateID !== 'number');
      }
    }
  }
};
</script>
<style>
#data-grid-demo {
  min-height: 700px;
}
</style>
