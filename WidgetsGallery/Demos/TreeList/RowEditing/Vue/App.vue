<template>
  <div>
    <div id="tree-list-demo">
      <dx-tree-list
        id="employees"
        :data-source="employees"
        :show-row-lines="true"
        :show-borders="true"
        :column-auto-width="true"
        :expanded-row-keys="expandedRowKeys"
        key-expr="ID"
        parent-id-expr="Head_ID"
        @cell-prepared="onCellPrepared"
        @editor-preparing="onEditorPreparing"
        @init-new-row="onInitNewRow"
      >
        <dx-editing
          :allow-updating="true"
          :allow-deleting="true"
          :allow-adding="true"
          mode="row"
        />
        <dx-column
          data-field="Full_Name"
        >
          <dx-required-rule/>
        </dx-column>
        <dx-column
          data-field="Head_ID"
          caption="Head"
        >
          <dx-lookup
            :data-source="dataSource"
            value-expr="ID"
            display-expr="Full_Name"
          />
          <dx-required-rule/>
        </dx-column>
        <dx-column
          data-field="Title"
          caption="Position"
        >
          <dx-required-rule/>
        </dx-column>
        <dx-column
          :width="120"
          data-field="Hire_Date"
          data-type="date"
        >
          <dx-required-rule/>
        </dx-column>
      </dx-tree-list>
    </div>
  </div>
</template>
<script>
import { employees } from './data.js';
import { DxTreeList, DxEditing, DxColumn, DxRequiredRule, DxLookup } from 'devextreme-vue/tree-list';

export default {
  components: {
    DxTreeList, DxEditing, DxColumn, DxRequiredRule, DxLookup
  },
  data() {
    return {
      employees: employees,
      expandedRowKeys: [1, 2, 3, 4, 5],
      dataSource: {
        store: employees,
        sort: 'Full_Name'
      }
    };
  },
  methods: {
    onCellPrepared(e) {
      if(e.column.command === 'edit') {
        let addLink = e.cellElement.querySelector('.dx-link-add');

        if(addLink) {
          addLink.remove();
        }
      }
    },
    onEditorPreparing(e) {
      if(e.dataField === 'Head_ID' && e.row.data.ID === 1) {
        e.cancel = true;
      }
    },
    onInitNewRow(e) {
      e.data.Head_ID = 1;
    }
  }
};
</script>
<style scoped>
#tree-list-demo {
    min-height: 700px;
}

#employees {
    max-height: 700px;
}
</style>
