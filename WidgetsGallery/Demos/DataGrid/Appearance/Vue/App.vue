<template>
  <div>
    <dx-data-grid
      :data-source="employees"
      :show-column-lines="showColumnLines"
      :show-row-lines="showRowLines"
      :show-borders="showBorders"
      :row-alternation-enabled="rowAlternationEnabled"
    >
      <dx-column
        :width="80"
        data-field="Prefix"
        caption="Title"
      />
      <dx-column data-field="FirstName"/>
      <dx-column data-field="LastName"/>
      <dx-column data-field="City"/>
      <dx-column data-field="State"/>
      <dx-column
        :width="130"
        data-field="Position"
      />
      <dx-column
        :width="100"
        data-field="BirthDate"
        data-type="date"
      />
      <dx-column
        :width="100"
        data-field="HireDate"
        data-type="date"
      />
    </dx-data-grid>

    <div class="options">
      <div class="caption">Options</div>
      <div class="option">
        <dx-check-box
          :value.sync="showColumnLines"
          text="Show Column Lines"
        />
      </div>
      <div class="option">
        <dx-check-box
          :value.sync="showRowLines"
          text="Show Row Lines"
        />
      </div>
      <div class="option">
        <dx-check-box
          :value.sync="showBorders"
          text="Show Borders"
        />
      </div>
      <div class="option">
        <dx-check-box
          :value.sync="rowAlternationEnabled"
          text="Alternating Row Color"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { DxDataGrid, DxColumn } from 'devextreme-vue/data-grid';
import { DxCheckBox } from 'devextreme-vue/check-box';
import service from './data.js';

export default {
  components: {
    DxDataGrid,
    DxColumn,
    DxCheckBox
  },
  data() {
    return {
      employees: service.getEmployees(),
      showColumnLines: false,
      showRowLines: true,
      showBorders: true,
      rowAlternationEnabled: true
    };
  }
};
</script>
<style scoped>
.options {
  padding: 20px;
  background-color: rgba(191, 191, 191, 0.15);
  margin-top: 20px;
}

.caption {
  font-size: 18px;
  font-weight: 500;
}

.option {
  width: 24%;
  display: inline-block;
  margin-top: 10px;
}
</style>
