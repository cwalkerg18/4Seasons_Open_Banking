<template>
  <div class="widget-container">
    <dx-html-editor
      v-model="value"
    >
      <dx-toolbar>
        <dx-item format-name="undo"/>
        <dx-item format-name="redo"/>
        <dx-item format-name="separator"/>
        <dx-item
          :format-values="headerValues"
          format-name="header"
        />
        <dx-item format-name="separator"/>
        <dx-item format-name="bold"/>
        <dx-item format-name="italic"/>
        <dx-item format-name="strike"/>
        <dx-item format-name="underline"/>
        <dx-item format-name="separator"/>
        <dx-item format-name="alignLeft"/>
        <dx-item format-name="alignCenter"/>
        <dx-item format-name="alignRight"/>
        <dx-item format-name="alignJustify"/>
        <dx-item format-name="separator"/>
        <dx-item
          :options="toolbarButtonOptions"
          widget="dxButton"
        />
      </dx-toolbar>
    </dx-html-editor>
    <dx-popup
      :show-title="true"
      :visible.sync="popupVisible"
      title="Markup"
    >
      {{ value }}
    </dx-popup>
  </div>
</template>
<script>

import {
  DxHtmlEditor,
  DxToolbar,
  DxItem
} from 'devextreme-vue/html-editor';
import { DxPopup } from './devextreme-vue/popup';
import { markup } from './data.js';

export default {
  components: {
    DxHtmlEditor,
    DxToolbar,
    DxItem,
    DxPopup
  },
  data() {
    return {
      value: markup,
      popupVisible: false,
      sizeValues: ['8pt', '10pt', '12pt', '14pt', '18pt', '24pt', '36pt'],
      fontValues: ['Arial', 'Courier New', 'Georgia', 'Impact', 'Lucida Console', 'Tahoma', 'Times New Roman', 'Verdana'],
      headerValues: [false, 1, 2, 3, 4, 5],
      toolbarButtonOptions: {
        text: 'Show markup',
        stylingMode: 'text',
        onClick: () => {
          this.popupVisible = true;
        }
      }
    };
  }
};
</script>
<style>
.dx-htmleditor-content img {
    vertical-align: middle;
    padding-right: 10px;
}
</style>
