<template>
  <div>
    <div
      :class="{ 'dx-rtl': rtlEnabled }"
    >
      <div class="options">
        <div class="caption">Options</div>
        <div class="dx-fieldset">
          <div class="dx-field">
            <div class="dx-field-label">Language</div>
            <div class="dx-field-value">
              <dx-select-box
                :items="languages"
                :value="languages[1]"
                :rtl-enabled="rtlEnabled"
                @valueChanged="onLanguageChanged"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="dx-fieldset">
        <div class="dx-field">
          <div class="dx-field-label">Text Box</div>
          <div class="dx-field-value">
            <dx-text-box
              :show-clear-button="true"
              :value="textValue"
              :rtl-enabled="rtlEnabled"
            />
          </div>
        </div>
        <div class="dx-field">
          <div class="dx-field-label">Number Box</div>
          <div class="dx-field-value">
            <dx-number-box
              :show-spin-buttons="true"
              :value="123"
              :rtl-enabled="rtlEnabled"
            />
          </div>
        </div>
        <div class="dx-field">
          <div class="dx-field-label">Select Box</div>
          <div class="dx-field-value">
            <dx-select-box
              :items="europeanUnion"
              :value="europeanUnion[0]"
              :rtl-enabled="rtlEnabled"
              :display-expr="displayExpr"
            />
          </div>
        </div>
        <div class="dx-field">
          <div class="dx-field-label">Tag Box</div>
          <div class="dx-field-value">
            <dx-tag-box
              :items="europeanUnion"
              :value="[europeanUnion[0].id]"
              :rtl-enabled="rtlEnabled"
              :display-expr="displayExpr"
              placeholder="..."
              value-expr="id"
            />
          </div>
        </div>
        <div class="dx-field">
          <div class="dx-field-label">Text Area</div>
          <div class="dx-field-value">
            <dx-text-area
              :value="textValue"
              :rtl-enabled="rtlEnabled"
            />
          </div>
        </div>
        <div class="dx-field">
          <div class="dx-field-label">Autocomplete</div>
          <div class="dx-field-value">
            <dx-autocomplete
              :items="europeanUnion"
              :rtl-enabled="rtlEnabled"
              :value-expr="displayExpr"
            />
          </div>
        </div>
        <div class="dx-field">
          <div class="dx-field-label">Check Box</div>
          <div class="dx-field-value">
            <dx-check-box
              :value="true"
              :text="textValue"
              :rtl-enabled="rtlEnabled"
            />
          </div>
        </div>
        <div class="dx-field">
          <div class="dx-field-label">Switch</div>
          <div class="dx-field-value">
            <dx-switch
              :rtl-enabled="rtlEnabled"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import { DxSelectBox, DxAutocomplete, DxCheckBox, DxSwitch, DxTextArea, DxTextBox, DxNumberBox, DxTagBox } from 'devextreme-vue';
import { europeanUnion } from './data.js';

export default {
  components: {
    DxSelectBox,
    DxAutocomplete,
    DxCheckBox,
    DxSwitch,
    DxTextArea,
    DxTextBox,
    DxNumberBox,
    DxTagBox
  },
  data: function() {
    return {
      europeanUnion,
      languages: [
        'Arabic: Right-to-Left direction',
        'English: Left-to-Right direction'
      ],
      displayExpr: 'nameEn',
      rtlEnabled: false,
      textValue: 'text',
      onLanguageChanged: (args) => {
        const isRTL = args.value === this.languages[0];

        this.displayExpr = isRTL ? 'nameAr' : 'nameEn';
        this.rtlEnabled = isRTL;
        this.textValue = isRTL ? 'نص' : 'text';
      }
    };
  }
};
</script>
<style>
.options {
    padding: 20px;
    background-color: rgba(191, 191, 191, 0.15);
}

.options .dx-fieldset {
    margin: 0;
}

.option {
    margin-top: 10px;
}

.caption {
    font-size: 18px;
    font-weight: 500;
    padding-right: 15px;
}

.option > span {
    margin-right: 10px;
}

.option > .dx-widget {
    display: inline-block;
    vertical-align: middle;
}

</style>
