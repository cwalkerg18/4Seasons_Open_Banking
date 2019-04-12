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
              :ref="treeViewRefName"
              :data-source="treeDataSource"
              :select-by-click="true"
              data-structure="plain"
              key-expr="ID"
              parent-id-expr="categoryId"
              selection-mode="single"
              display-expr="name"
              @content-ready="$event.component.selectItem(treeBoxValue)"
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
          :display-expr="gridBox_displayExpr"
          :show-clear-button="true"
          :data-source="gridDataSource"
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
              :selected-row-keys.sync="gridSelectedRowKeys"
              height="100%"
            >
              <dx-selection mode="single"/>
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
      grid_BoxValue: 3,
      grid_SelectedRowKeys: [3],
      treeViewRefName: 'tree-view'
    };
  },
  computed: {
    gridBoxValue: {
      get: function() {
        return this.grid_BoxValue;
      },
      set: function(value) {
        this.grid_SelectedRowKeys = value && [value] || [];
        this.grid_BoxValue = value;
      }
    },
    gridSelectedRowKeys: {
      get: function() {
        return this.grid_SelectedRowKeys;
      },
      set: function(value) {
        this.grid_BoxValue = value.length && value[0] || null;
        this.grid_SelectedRowKeys = value;
      }
    }
  },
  created() {
    this.treeDataSource = this.makeAsyncDataSource('treeProducts.json');
    this.gridDataSource = this.makeAsyncDataSource('customers.json');
    this.treeBoxValue = '1_1';
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
    syncTreeViewSelection() {
      if (!this.$refs[this.textBoxRefName]) return;
      if (!this.treeBoxValue) {
        this.$refs[this.textBoxRefName].instance.unselectAll();
      } else {
        this.$refs[this.textBoxRefName].instance.selectItem(this.treeBoxValue);
      }
    },
    treeView_itemSelectionChanged(e) {
      this.treeBoxValue = e.component.getSelectedNodesKeys();
    },
    gridBox_displayExpr(item) {
      return item && `${item.CompanyName } <${ item.Phone }>`;
    }
  }
};
</script>
<style scoped>
.dx-fieldset {
    height: 500px;
}
</style>
