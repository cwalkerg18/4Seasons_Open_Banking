<template>
  <div id="data-grid-demo">
    <dx-data-grid
      :data-source="dataSource"
      :show-borders="true"
      key-expr="ID"
    >
      <dx-editing
        :allow-updating="true"
        mode="batch"
      />
      <dx-paging :enabled="false"/>
      <dx-column
        :width="70"
        data-field="Prefix"
        caption="Title"
      />
      <dx-column
        data-field="FirstName"
      />
      <dx-column
        data-field="LastName"
      />
      <dx-column
        :width="170"
        data-field="Position"
      />
      <dx-column
        :width="125"
        data-field="StateID"
        caption="State"
      >
        <dx-lookup
          :data-source="states"
          value-expr="ID"
          display-expr="Name"
        />
      </dx-column>
      <dx-column
        :show-editor-always="true"
        data-field="BirthDate"
        data-type="date"
      />
    </dx-data-grid>
  </div>
</template>
<script>
import {
  DxDataGrid,
  DxColumn,
  DxPaging,
  DxEditing,
  DxLookup
} from 'devextreme-vue/data-grid';
import { employees, states } from './data.js';

export default {
  components: {
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxEditing,
    DxLookup
  },
  data() {
    return {
      dataSource: employees,
      states: states
    };
  }
};
</script>
<style>
#data-grid-demo {
  min-height: 700px;
}
</style>
