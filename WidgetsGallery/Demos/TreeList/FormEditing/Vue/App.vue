<template>
  <div id="tree-list-demo">
    <dx-tree-list
      id="employees"
      :data-source="employees"
      :column-auto-width="true"
      :show-row-lines="true"
      :show-borders="true"
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
        mode="form"
      />
      <dx-column
        data-field="Full_Name"
      >
        <dx-validation-rule
          type="required"
        />
      </dx-column>
      <dx-column
        data-field="Prefix"
        caption="Title"
      >
        <dx-validation-rule
          type="required"
        />
      </dx-column>
      <dx-column
        :visible="false"
        data-field="Head_ID"
        caption="Head"
      >
        <dx-lookup
          :data-source="lookupData"
          value-expr="ID"
          display-expr="Full_Name"
        />
        <dx-validation-rule
          type="required"
        />
      </dx-column>
      <dx-column
        data-field="Title"
        caption="Position"
      >
        <dx-validation-rule
          type="required"
        />
      </dx-column>
      <dx-column
        :width="150"
        data-field="City"
      >
        <dx-validation-rule
          type="required"
        />
      </dx-column>
      <dx-column
        :width="120"
        data-field="Hire_Date"
        data-type="date"
      >
        <dx-validation-rule
          type="required"
        />
      </dx-column>
    </dx-tree-list>
  </div>
</template>
<script>
import { employees } from './data.js';
import { DxTreeList, DxEditing, DxColumn, DxValidationRule, DxLookup } from 'devextreme-vue/tree-list';

export default {
  components: {
    DxTreeList, DxEditing, DxColumn, DxValidationRule, DxLookup
  },
  data() {
    return {
      employees: employees,
      expandedRowKeys: [1, 2, 3, 4, 5],
      lookupData: {
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
        e.editorOptions.disabled = true;
        e.editorOptions.value = null;
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
</style>
