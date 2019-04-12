<template>
  <div>
    <div class="dx-fieldset">
      <div class="dx-field">
        <div class="dx-field-value">
          <dx-button-group
            :items="alignments"
            key-expr="alignment"
            styling-mode="outlined"
          />
        </div>
      </div>
      <div class="dx-field">
        <div class="dx-field-value">
          <dx-button-group
            :items="fontStyles"
            key-expr="style"
            styling-mode="outlined"
            selection-mode="multiple"
          />
        </div>
      </div>
    </div>
    <div class="dx-fieldset dx-buttongroup-mode-text">
      <div class="dx-field dx-theme-border-color dx-demo-separator">
        <div class="dx-field-value">
          <dx-button-group
            :items="alignments"
            key-expr="alignment"
            styling-mode="text"
          />
        </div>
      </div>
      <div class="dx-field">
        <div class="dx-field-value">
          <dx-button-group
            :items="fontStyles"
            key-expr="style"
            styling-mode="text"
            selection-mode="multiple"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { DxButtonGroup } from 'devextreme-vue';
import { alignments, fontStyles } from './data.js';

export default {
  components: {
    DxButtonGroup
  },
  data() {
    return {
      alignments,
      fontStyles
    };
  }
};
</script>
<style scoped>
  .dx-viewport:not(.dx-theme-ios7) .dx-fieldset {
    width: 420px;
    margin: 30px auto;
  }

  .dx-viewport:not(.dx-theme-ios7) .dx-fieldset:first-child {
    margin-top: 120px;
  }

  .dx-viewport:not(.dx-theme-ios7) {
    font-size: 16px;
  }

  .dx-viewport:not(.dx-theme-ios7) .dx-field {
    display: inline-block;
  }

  .dx-viewport:not(.dx-theme-ios7) .dx-field-value:not(.dx-widget) > .dx-button {
    float: none;
  }

  .dx-viewport:not(.dx-theme-ios7) .dx-field-value:not(.dx-switch):not(.dx-checkbox):not(.dx-button),
  .dx-viewport:not(.dx-theme-ios7) {
    float: none;
    width: 100%;
  }

  .dx-viewport:not(.dx-theme-ios7) {
    padding-left: 0;
  }

  .dx-field:first-child {
    padding-right: 10px;
  }

  .dx-field:last-child {
    padding-left: 10px;
  }

  .dx-buttongroup-mode-text .dx-field:first-child {
    padding-right: 11px;
  }

  .dx-buttongroup-mode-text .dx-field:last-child {
    padding-left: 9px;
  }

  .dx-demo-separator {
    border-right-width: 1px;
    border-right-style: solid;
  }
</style>
