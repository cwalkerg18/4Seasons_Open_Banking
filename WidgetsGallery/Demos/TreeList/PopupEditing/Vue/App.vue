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
    >
      <dx-editing
        :allow-updating="true"
        :allow-deleting="true"
        :allow-adding="true"
        :popup="popupOptions"
        mode="popup"
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
import { DxTreeList, DxEditing, DxColumn, DxValidationRule } from 'devextreme-vue/tree-list';

export default {
  components: {
    DxTreeList, DxEditing, DxColumn, DxValidationRule
  },
  data() {
    return {
      employees: employees,
      expandedRowKeys: [1],
      popupOptions: {
        title: 'Employee Info',
        showTitle: true,
        width: 700,
        position: { my: 'top', at: 'top', of: window }
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
    }
  }
};
</script>
<style scoped>
#tree-list-demo {
  min-height: 530px;
}

#employees {
  max-height: 530px;
}
</style>
