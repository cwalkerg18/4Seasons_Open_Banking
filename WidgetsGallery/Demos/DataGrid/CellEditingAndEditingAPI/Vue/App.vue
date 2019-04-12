<template>
  <div id="data-grid-demo">
    <dx-button
      id="gridDeleteSelected"
      :width="195"
      :height="34"
      :disabled="!selectedItemKeys.length"
      text="Delete Selected Records"
      @click="deleteRecords"
    />
    <dx-data-grid
      id="gridContainer"
      :data-source="dataSource"
      :show-borders="true"
      :selected-row-keys="selectedItemKeys"
      key-expr="ID"
      @selection-changed="selectionChanged"
    >
      <dx-editing
        :allow-updating="true"
        mode="cell"
      />
      <dx-paging :enabled="false"/>
      <dx-selection mode="multiple"/>
      <dx-column
        :width="55"
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
  DxSelection,
  DxLookup
} from 'devextreme-vue/data-grid';

import { DxButton } from 'devextreme-vue/button';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';

import { employees, states } from './data.js';

export default {
  components: {
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxEditing,
    DxSelection,
    DxLookup,
    DxButton
  },
  data() {
    return {
      dataSource: new DataSource({
        store: new ArrayStore({
          data: employees,
          key: 'ID'
        })
      }),
      selectedItemKeys: [],
      states: states,
      selectionChanged: (data)=>{
        this.selectedItemKeys = data.selectedRowKeys;
      },
      deleteRecords:()=>{
        this.selectedItemKeys.forEach((key) => {
          this.dataSource.store().remove(key);
        });
        this.selectedItemKeys = [];
        this.dataSource.reload();
      }
    };
  }
};
</script>
<style>
#data-grid-demo {
    min-height: 700px;
}

#gridContainer {
    padding-top: 45px;
}

#gridDeleteSelected {
    position: absolute;
    z-index: 1;
    right: 0;
    margin: 1px;
    top: 0;
}
</style>
