<template>
  <dx-data-grid
    id="gridContainer"
    :data-source="dataSource"
    :show-borders="true"
    :column-width="100"
  >
    <dx-paging :enabled="false"/>
    <dx-scrolling column-rendering-mode="virtual"/>
  </dx-data-grid>
</template>
<script>
import { DxDataGrid, DxScrolling, DxPaging } from 'devextreme-vue/data-grid';
import { generateData } from './data.js';

export default {
  components: {
    DxDataGrid,
    DxScrolling,
    DxPaging
  },
  computed: {
    dataSource() {
      return generateData(50, 500);
    }
  }
};
</script>
<style>
#gridContainer {
    height: 440px;
}
</style>
