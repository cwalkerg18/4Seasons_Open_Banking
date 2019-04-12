<template>
  <div>
    <dx-data-grid
      :data-source="dataSource"
      :show-borders="true"
      :column-auto-width="true"
      key-expr="ID"
    >
      <dx-editing
        :allow-updating="true"
        :allow-adding="true"
        mode="batch"
      />
      <dx-paging :enabled="false"/>

      <dx-column data-field="FirstName">
        <dx-required-rule/>
      </dx-column>
      <dx-column data-field="LastName">
        <dx-required-rule/>
      </dx-column>
      <dx-column data-field="Position">
        <dx-required-rule/>
      </dx-column>
      <dx-column data-field="Phone">
        <dx-required-rule/>
        <dx-pattern-rule
          :pattern="pattern"
          message="Your phone must have &quot;(555) 555-5555&quot; format!"
        />
      </dx-column>
      <dx-column data-field="Email">
        <dx-required-rule/>
        <dx-email-rule/>
      </dx-column>
    </dx-data-grid>
  </div>
</template>
<script>
import {
  DxDataGrid,
  DxColumn,
  DxPaging,
  DxEditing,
  DxRequiredRule,
  DxEmailRule,
  DxPatternRule
} from 'devextreme-vue/data-grid';
import { employees } from './data.js';

export default {
  components: {
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxEditing,
    DxRequiredRule,
    DxEmailRule,
    DxPatternRule
  },
  data() {
    return {
      dataSource: employees,
      pattern: /^\(\d{3}\) \d{3}-\d{4}$/i

    };
  }
};
</script>
