<template>
  <div class="form">
    <div class="dx-fieldset">
      <div class="dx-field">
        <div class="dx-field-label">Default mode</div>
        <div class="dx-field-value">
          <dx-number-box/>
        </div>
      </div>
      <div class="dx-field">
        <div class="dx-field-label">With spin and clear buttons</div>
        <div class="dx-field-value">
          <dx-number-box
            :value="20.5"
            :show-spin-buttons="true"
            :show-clear-button="true"
          />
        </div>
      </div>
      <div class="dx-field">
        <div class="dx-field-label">Disabled</div>
        <div class="dx-field-value">
          <dx-number-box
            :value="20.5"
            :show-spin-buttons="true"
            :show-clear-button="true"
            :disabled="true"
          />
        </div>
      </div>
      <div class="dx-field">
        <div class="dx-field-label">With max and min values</div>
        <div class="dx-field-value">
          <dx-number-box
            :value="15"
            :min="10"
            :max="20"
            :show-spin-buttons="true"
          />
        </div>
      </div>
    </div>
    <div class="dx-fieldset">
      <div class="dx-fieldset-header">Event Handling</div>
      <div class="dx-field">
        <div class="dx-field-label">This month sales</div>
        <div class="dx-field-value">
          <dx-number-box
            :max="30"
            :min="0"
            :show-spin-buttons="true"
            :value.sync="value"
          />
        </div>
      </div>
      <div class="dx-field">
        <div class="dx-field-label">Stock</div>
        <div class="dx-field-value">
          <dx-number-box
            :min="0"
            :show-spin-buttons="false"
            :read-only="true"
            :value="max - value"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { DxNumberBox } from 'devextreme-vue/number-box';

export default {
  components: {
    DxNumberBox
  },
  data() {
    return {
      max: 30,
      value: 16
    };
  }
};
</script>

