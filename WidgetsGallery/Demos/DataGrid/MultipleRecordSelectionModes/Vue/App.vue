<template>
  <div>
    <dx-data-grid
      :data-source="sales"
      :show-borders="true"
      key-expr="orderId"
    >

      <dx-column
        :width="90"
        data-field="orderId"
        caption="Order ID"
      />
      <dx-column data-field="city"/>
      <dx-column
        :width="180"
        data-field="country"
      />
      <dx-column data-field="region"/>
      <dx-column
        data-field="date"
        data-type="date"
      />
      <dx-column
        :width="90"
        data-field="amount"
        format="currency"
      />

      <dx-paging :page-size="10"/>
      <dx-selection
        :select-all-mode="allMode"
        :show-check-boxes-mode="checkBoxesMode"
        mode="multiple"
      />
      <dx-filter-row :visible="true"/>
    </dx-data-grid>

    <div class="options">
      <div class="caption">Options</div>
      <div class="option">
        <span>Select All Mode</span>
        <dx-select-box
          id="select-all-mode"
          :data-source="['allPages', 'page']"
          :disabled="checkBoxesMode === 'none'"
          v-model="allMode"
        />
      </div>
      <div class="option checkboxes-mode">
        <span>Show Checkboxes Mode</span>
        <dx-select-box
          id="show-checkboxes-mode"
          :data-source="['none', 'onClick', 'onLongTap', 'always']"
          v-model="checkBoxesMode"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { sales } from './data.js';
import { DxSelectBox } from 'devextreme-vue';
import {
  DxDataGrid,
  DxColumn,
  DxPaging,
  DxSelection,
  DxFilterRow
} from 'devextreme-vue/data-grid';

export default {
  components: {
    DxSelectBox,
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxSelection,
    DxFilterRow
  },
  data() {
    return {
      allMode: 'allPages',
      checkBoxesMode: 'onClick',
      sales
    };
  }
};
</script>
<style scoped>
.options {
  margin-top: 20px;
  padding: 20px;
  background-color: rgba(191, 191, 191, 0.15);
  position: relative;
}

.caption {
  font-size: 18px;
  font-weight: 500;
}

.option {
  margin-top: 10px;
}

.checkboxes-mode {
  position: absolute;
  right: 20px;
  bottom: 20px;
}

.option > .dx-selectbox {
  width: 150px;
  display: inline-block;
  vertical-align: middle;
}

.option > span {
  margin-right: 10px;
}
</style>
