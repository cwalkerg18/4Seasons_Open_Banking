<template>
  <div class="form">
    <div class="dx-fieldset">
      <div class="dx-field">
        <div class="dx-field-label">Checked</div>
        <div class="dx-field-value">
          <dx-check-box :value="true"/>
        </div>
      </div>
      <div class="dx-field">
        <div class="dx-field-label">Unchecked</div>
        <div class="dx-field-value">
          <dx-check-box :value="false"/>
        </div>
      </div>
      <div class="dx-field">
        <div class="dx-field-label">Indeterminate</div>
        <div class="dx-field-value">
          <dx-check-box v-model="undefined"/>
        </div>
      </div>
      <div class="dx-field">
        <div class="dx-field-label">Value change handling</div>
        <div class="dx-field-value">
          <dx-check-box v-model="checkBoxValue"/>
        </div>
      </div>
      <div class="dx-field">
        <div class="dx-field-label">Disabled</div>
        <div class="dx-field-value">
          <dx-check-box
            :disabled="true"
            :value="checkBoxValue"
          />
        </div>
      </div>
      <div class="dx-field">
        <div class="dx-field-label">With label</div>
        <div class="dx-field-value">
          <dx-check-box
            :value="true"
            :width="80"
            text="Check"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { DxCheckBox } from 'devextreme-vue/check-box';

export default {
  components: {
    DxCheckBox
  },
  data() {
    return {
      checkBoxValue: undefined
    };
  }
};
</script>
