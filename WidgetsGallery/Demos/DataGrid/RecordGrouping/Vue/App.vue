<template>
  <div>
    <dx-data-grid
      :allow-column-reordering="true"
      :data-source="customers"
      :show-borders="true"
    >

      <dx-column data-field="CompanyName"/>
      <dx-column data-field="Phone"/>
      <dx-column data-field="Fax"/>
      <dx-column data-field="City"/>
      <dx-column
        :group-index="0"
        data-field="State"
      />

      <dx-group-panel :visible="true"/>
      <dx-grouping :auto-expand-all="autoExpandAll"/>
      <dx-paging :page-size="10"/>
      <dx-search-panel :visible="true"/>
    </dx-data-grid>

    <div class="options">
      <div class="caption">Options</div>
      <div class="option">
        <dx-check-box
          :value.sync="autoExpandAll"
          text="Expand All Groups"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { customers } from './data.js';
import { DxCheckBox } from 'devextreme-vue';
import {
  DxDataGrid,
  DxColumn,
  DxGrouping,
  DxGroupPanel,
  DxSearchPanel,
  DxPaging
} from 'devextreme-vue/data-grid';

export default {
  components: {
    DxCheckBox,
    DxColumn,
    DxGroupPanel,
    DxGrouping,
    DxPaging,
    DxSearchPanel,
    DxDataGrid
  },
  data() {
    return {
      autoExpandAll: true,
      customers
    };
  }
};
</script>
<style scoped>
.options {
  padding: 20px;
  margin-top: 20px;
  background-color: rgba(191, 191, 191, 0.15);
}

.caption {
  font-size: 18px;
  font-weight: 500;
}

.option {
  margin-top: 10px;
}
</style>
