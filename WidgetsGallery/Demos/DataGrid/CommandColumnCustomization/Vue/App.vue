<template>
  <div>
    <dx-data-grid
      id="gridContainer"
      :data-source="employees"
      :show-borders="true"
      key-expr="ID"
      @row-validating="rowValidating"
      @editor-preparing="editorPreparing"
    >

      <dx-paging :enabled="false"/>
      <dx-editing
        :allow-updating="true"
        :allow-deleting="allowDeleting"
        :use-icons="true"
        mode="row"
      />

      <dx-column
        :width="110"
        :buttons="editButtons"
        type="buttons"
      />
      <dx-column
        data-field="Prefix"
        caption="Title"
      />
      <dx-column data-field="FirstName"/>
      <dx-column data-field="LastName"/>
      <dx-column
        :width="130"
        data-field="Position"
      />
      <dx-column
        :lookup="lookup"
        :width="125"
        data-field="StateID"
        caption="State"
      />
      <dx-column
        :width="125"
        data-field="BirthDate"
        data-type="date"
      />
    </dx-data-grid>
  </div>
</template>
<script>
import Vue from 'vue';
import {
  DxDataGrid,
  DxColumn,
  DxEditing,
  DxPaging
} from 'devextreme-vue/data-grid';

import service from './data.js';

export default {
  components: {
    DxDataGrid,
    DxColumn,
    DxEditing,
    DxPaging
  },
  data() {
    return {
      employees: service.getEmployees(),
      editButtons: ['edit', 'delete', {
        hint: 'Clone',
        icon: 'repeat',
        visible: this.isCloneIconVisible,
        onClick: this.cloneIconClick
      }],
      lookup: {
        dataSource: service.getStates(),
        displayExpr: 'Name',
        valueExpr: 'ID'
      }
    };
  },
  methods: {
    isChief(position) {
      return position && ['CEO', 'CMO'].indexOf(position.trim().toUpperCase()) >= 0;
    },
    isCloneIconVisible(e) {
      return !e.row.isEditing && !this.isChief(e.row.data.Position);
    },
    cloneIconClick(e) {
      var clonedItem = Vue.util.extend({}, e.row.data);

      clonedItem.ID = service.getMaxID();
      this.employees.splice(e.row.rowIndex, 0, clonedItem);
      e.event.preventDefault();
    },
    rowValidating(e) {
      var position = e.newData.Position;

      if(this.isChief(position)) {
        e.errorText = `The company can have only one ${ position.toUpperCase() }. Please choose another position.`;
        e.isValid = false;
      }
    },
    editorPreparing(e) {
      if(e.parentType === 'dataRow' && e.dataField === 'Position') {
        e.editorOptions.readOnly = this.isChief(e.value);
      }
    },
    allowDeleting(e) {
      return !this.isChief(e.row.data.Position);
    }
  }
};
</script>
