<template>
  <div id="data-grid-demo">
    <dx-data-grid
      :data-source="dataSource"
      :show-borders="true"
      key-expr="ID"
    >
      <dx-paging :enabled="false"/>
      <dx-editing
        :allow-updating="true"
        mode="popup"
      >
        <dx-popup
          :show-title="true"
          :width="700"
          :height="345"
          title="Employee Info"
        >
          <dx-position
            my="top"
            at="top"
            of="window"
          />
        </dx-popup>
      </dx-editing>

      <dx-column
        :width="70"
        data-field="Prefix"
        caption="Title"
      />
      <dx-column data-field="FirstName"/>
      <dx-column data-field="LastName"/>
      <dx-column
        data-field="BirthDate"
        data-type="date"
      />
      <dx-column
        :width="170"
        data-field="Position"
      />
      <dx-column
        data-field="HireDate"
        data-type="date"
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
    </dx-data-grid>
  </div>
</template>
<script>
import {
  DxDataGrid,
  DxColumn,
  DxPaging,
  DxEditing,
  DxPopup,
  DxLookup,
  DxPosition
} from 'devextreme-vue/data-grid';
import { employees, states } from './data.js';

export default {
  components: {
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxEditing,
    DxPopup,
    DxLookup,
    DxPosition
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
