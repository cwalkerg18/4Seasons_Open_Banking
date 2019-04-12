<template>
  <div class="dx-fieldset">
    <div class="dx-field">
      <div class="dx-field-label">DropDownBox with embedded TreeView</div>
      <div class="dx-field-value">
        <dx-drop-down-box
          :value.sync="treeBoxValue"
          :show-clear-button="true"
          :data-source="treeDataSource"
          value-expr="ID"
          display-expr="name"
          placeholder="Select a value..."
          @value-changed="syncTreeViewSelection($event)"
        >
          <div
            slot="content"
            slot-scope="data"
          >
            <dx-tree-view
              :ref="treeViewName"
              :data-source="treeDataSource"
              :select-by-click="true"
              :select-nodes-recursive="false"
              data-structure="plain"
              key-expr="ID"
              parent-id-expr="categoryId"
              selection-mode="multiple"
              show-check-boxes-mode="normal"
              display-expr="name"
              @content-ready="syncTreeViewSelection($event)"
              @item-selection-changed="treeView_itemSelectionChanged($event)"
            />
          </div>
        </dx-drop-down-box>
      </div>
    </div>
    <div class="dx-field">
      <div class="dx-field-label">DropDownBox with embedded DataGrid</div>
      <div class="dx-field-value">
        <dx-drop-down-box
          :value.sync="gridBoxValue"
          :defer-rendering="false"
          :show-clear-button="true"
          :data-source="gridDataSource"
          display-expr="CompanyName"
          value-expr="ID"
          placeholder="Select a value..."
        >
          <div
            slot="content"
            slot-scope="data"
          >
            <dx-data-grid
              :data-source="gridDataSource"
              :columns="['CompanyName', 'City', 'Phone']"
              :hover-state-enabled="true"
              :selected-row-keys.sync="gridBoxValue"
            >
              <dx-selection mode="multiple"/>
              <dx-paging
                :enabled="true"
                :page-size="10"
              />
              <dx-filter-row :visible="true"/>
              <dx-scrolling mode="infinite"/>
            </dx-data-grid>
          </div>
        </dx-drop-down-box>
      </div>
    </div>
  </div>
</template>
<script>
import { DxDropDownBox, DxTreeView } from 'devextreme-vue';
import { DxDataGrid, DxSelection, DxPaging, DxFilterRow, DxScrolling } from 'devextreme-vue/data-grid';
import CustomStore from 'devextreme/data/custom_store';
import 'whatwg-fetch';

export default {
  components: {
    DxDropDownBox,
    DxTreeView,
    DxDataGrid,
    DxSelection,
    DxPaging,
    DxFilterRow,
    DxScrolling
  },
  data() {
    return {
      treeDataSource: null,
      treeBoxValue: null,
      gridDataSource: null,
      grid_BoxValue: [3],
      treeViewName: 'tree-view'
    };
  },
  computed: {
    gridBoxValue: {
      get: function() {
        return this.grid_BoxValue;
      },
      set: function(value) {
        this.grid_BoxValue = value || [];
      }
    }
  },
  created() {
    this.treeDataSource = this.makeAsyncDataSource('treeProducts.json');
    this.gridDataSource = this.makeAsyncDataSource('customers.json');
    this.treeBoxValue = ['1_1'];
  },
  methods: {
    makeAsyncDataSource(jsonFile) {
      return new CustomStore({
        loadMode: 'raw',
        key: 'ID',
        load: function() {
          return fetch(`../../../../data/${ jsonFile}`)
            .then(response => response.json());
        }
      });
    },
    syncTreeViewSelection(e) {
      let treeView = (e.component.selectItem && e.component) || (this.$refs[this.treeViewName] && this.$refs[this.treeViewName].instance);

      if (treeView) {
        if (e.value === null) {
          treeView.unselectAll();
        } else {
          let values = e.value || this.treeBoxValue;
          values && values.forEach(function(value) {
            treeView.selectItem(value);
          });
        }
      }
    },
    treeView_itemSelectionChanged(e) {
      this.treeBoxValue = e.component.getSelectedNodesKeys();
    }
  }
};
</script>
<style scoped>
.dx-fieldset {
    height: 500px;
}
</style>
