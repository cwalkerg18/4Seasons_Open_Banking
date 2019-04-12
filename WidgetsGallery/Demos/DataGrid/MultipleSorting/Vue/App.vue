<template>
  <div>
    <dx-data-grid
      :ref="dataGridRefName"
      :data-source="employees"
      :show-borders="true"
    >
      <dx-column
        :width="70"
        data-field="Prefix"
        caption="Title"
      />
      <dx-column
        data-field="FirstName"
        sort-order="asc"
      />
      <dx-column
        data-field="LastName"
        sort-order="asc"
      />
      <dx-column data-field="City"/>
      <dx-column data-field="State"/>
      <dx-column
        :width="130"
        :allow-sorting="!positionDisableSorting"
        data-field="Position"
      />
      <dx-column
        data-field="HireDate"
        data-type="date"
      />
      <dx-sorting mode="multiple"/>
    </dx-data-grid>

    <div class="options">
      <div class="caption">Options</div>
      <div class="option">
        <dx-check-box
          :value.sync="positionDisableSorting"
          text="Disable Sorting for the Position Column"
          @value-changed="onValueChanged"
        />
      </div>
    </div>
  </div>
</template>
<script>
import {
  DxColumn,
  DxDataGrid,
  DxSorting
} from 'devextreme-vue/data-grid';
import { DxCheckBox } from 'devextreme-vue';
import { employees } from './data.js';

export default {
  components: {
    DxCheckBox,
    DxColumn,
    DxDataGrid,
    DxSorting
  },
  data() {
    return {
      positionDisableSorting: false,
      dataGridRefName: 'dataGrid',
      employees
    };
  },
  methods: {
    onValueChanged() {
      const dataGrid = this.$refs[this.dataGridRefName].instance;

      dataGrid.columnOption(5, 'sortOrder', void 0);
    }
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
