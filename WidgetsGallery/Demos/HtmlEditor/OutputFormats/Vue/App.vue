<template>
  <div class="widget-container">
    <dx-html-editor
      v-model="valueContent"
      :value-type="editorValueType"
      :height="300"
    >
      <dx-toolbar>
        <dx-item format-name="undo"/>
        <dx-item format-name="redo"/>
        <dx-item format-name="separator"/>
        <dx-item
          :format-values="sizeValues"
          format-name="size"
        />
        <dx-item
          :format-values="fontValues"
          format-name="font"
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
        <dx-item format-name="color"/>
        <dx-item format-name="background"/>
      </dx-toolbar>
    </dx-html-editor>

    <div class="options">
      <dx-button-group :selected-items.sync="selectedItems">
        <dx-item text="Html"/>
        <dx-item text="Markdown"/>
      </dx-button-group>
      <div class="value-content">{{ valueContent }}</div>
    </div>
  </div>
</template>
<script>

import {
  DxHtmlEditor,
  DxToolbar,
  DxItem
} from 'devextreme-vue/html-editor';
import {
  DxButtonGroup,
  DxItem as DxButtonGroupItem
} from 'devextreme-vue/button-group';

import { markup } from './data.js';

import 'devextreme/ui/html_editor/converters/markdown';

export default {
  components: {
    DxHtmlEditor,
    DxToolbar,
    DxItem,
    DxButtonGroup,
    DxButtonGroupItem
  },
  data() {
    return {
      valueContent: markup,
      selectedItems: [{ text: 'Html' }],
      sizeValues: ['8pt', '10pt', '12pt', '14pt', '18pt', '24pt', '36pt'],
      fontValues: ['Arial', 'Courier New', 'Georgia', 'Impact', 'Lucida Console', 'Tahoma', 'Times New Roman', 'Verdana']
    };
  },
  computed: {
    editorValueType: function() {
      return this.selectedItems[0].text.toLowerCase();
    }
  }
};
</script>
<style>
.dx-htmleditor-content img {
    vertical-align: middle;
    padding-right: 10px;
}

.value-content {
    margin-top: 20px;
    overflow: auto;
    height: 110px;
    width: 100%;
    white-space: pre-wrap;
}

.options {
    margin-top: 20px;
    padding: 20px;
    background-color: rgba(191, 191, 191, 0.15);
    box-sizing: border-box;
    width: 100%;
}
</style>
