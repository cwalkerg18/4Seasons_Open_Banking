<template>
  <dx-data-grid
    id="gridContainer"
    :customize-columns="customizeColumns"
    :data-source="dataSource"
    :show-borders="true"
    @content-ready="onContentReady"
  >
    <dx-load-panel :enabled="true"/>
    <dx-scrolling mode="virtual"/>
    <dx-sorting mode="none"/>
  </dx-data-grid>
</template>
<script>
import { DxDataGrid, DxScrolling, DxSorting, DxLoadPanel } from 'devextreme-vue/data-grid';
import { generateData } from './data.js';

export default {
  components: {
    DxDataGrid,
    DxScrolling,
    DxSorting,
    DxLoadPanel
  },
  computed: {
    dataSource() {
      return generateData(100000);
    }
  },
  methods: {
    onContentReady(e) {
      e.component.option('loadPanel.enabled', false);
    },
    customizeColumns(columns) {
      columns[0].width = 70;
    }
  }
};
</script>
<style>
#gridContainer {
    height: 440px;
}
</style>
