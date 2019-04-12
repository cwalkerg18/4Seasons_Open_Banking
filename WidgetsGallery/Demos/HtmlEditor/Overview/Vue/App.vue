<template>
  <dx-html-editor>
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
      <dx-item
        :format-values="headerValues"
        format-name="header"
      />
      <dx-item format-name="separator"/>
      <dx-item format-name="orderedList"/>
      <dx-item format-name="bulletList"/>
      <dx-item format-name="separator"/>
      <dx-item format-name="color"/>
      <dx-item format-name="background"/>
      <dx-item format-name="separator"/>
      <dx-item format-name="link"/>
      <dx-item format-name="image"/>
      <dx-item format-name="separator"/>
      <dx-item format-name="clear"/>
      <dx-item format-name="codeBlock"/>
      <dx-item format-name="blockquote"/>
    </dx-toolbar>

    <div v-html="markup"/>
  </dx-html-editor>
</template>
<script>

import {
  DxHtmlEditor,
  DxToolbar,
  DxItem
} from 'devextreme-vue/html-editor';
import { markup } from './data.js';

export default {
  components: {
    DxHtmlEditor,
    DxToolbar,
    DxItem
  },
  data() {
    return {
      markup,
      sizeValues: ['8pt', '10pt', '12pt', '14pt', '18pt', '24pt', '36pt'],
      fontValues: ['Arial', 'Courier New', 'Georgia', 'Impact', 'Lucida Console', 'Tahoma', 'Times New Roman', 'Verdana'],
      headerValues: [false, 1, 2, 3, 4, 5]
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
