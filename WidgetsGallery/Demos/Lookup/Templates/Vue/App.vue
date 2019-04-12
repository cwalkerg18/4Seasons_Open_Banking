<template>
  <div>
    <div class="dx-fieldset">
      <div class="dx-fieldset-header">Custom Field Template</div>
      <div class="dx-field">
        <DxLookup
          v-model="lookupValue"
          :items="employees"
          :display-expr="getDisplayExpr"
          class="field-customization"
          value-expr="ID"
          title="Select employee"
          field-template="field-item"
        >
          <div
            slot="field-item"
            slot-scope="data"
          >
            <field-item :item-data="data"/>
          </div>
        </DxLookup>
      </div>
    </div>
    <div class="dx-fieldset">
      <div class="dx-fieldset-header">Custom Item Template</div>
      <div class="dx-field">
        <DxLookup
          :items="employees"
          :search-expr="['FirstName', 'LastName', 'Prefix']"
          :display-expr="getDisplayExpr"
          value-expr="ID"
          placeholder="Select employee"
          title="Select employee"
          item-template="list-item"
        >
          <div
            slot="list-item"
            slot-scope="data"
          >
            <list-item :item-data="data"/>
          </div>
        </DxLookup>
      </div>
    </div>
  </div>
</template>
<script>
import { DxLookup } from 'devextreme-vue/lookup';
import FieldItem from './FieldItem.vue';
import ListItem from './ListItem.vue';
import { employees } from './data.js';

export default {
  components: {
    DxLookup,
    FieldItem,
    ListItem
  },
  data() {
    return {
      lookupValue: employees[0].ID,
      employees
    };
  },
  methods: {
    getDisplayExpr(item) {
      return item ? `${item.FirstName} ${item.LastName}` : '';
    }
  }
};
</script>
<style scoped>
  .field-customization {
    min-height: 32px;
  }

  .dx-lookup.field-customization .dx-lookup-field {
    padding: 0 5px;
  }

  .dx-viewport:not(.dx-theme-ios7) .dx-fieldset {
    width: 40%;
    float: left;
  }

  .dx-field > .dx-lookup {
    flex: 1;
  }
</style>
