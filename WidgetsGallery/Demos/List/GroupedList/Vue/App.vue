<template>
  <div class="list-container">
    <dx-list
      :data-source="dataSource"
      :grouped="true"
      :collapsible-groups="true"
      height="100%"
    >
      <div
        slot="group"
        slot-scope="item"
      >
        <div>Assigned: {{ item.key }}</div>
      </div>
    </dx-list>
  </div>
</template>
<script>
import DxList from 'devextreme-vue/list';

import { employees } from './data.js';

export default {
  components: {
    DxList
  },
  data() {
    return {
      dataSource: employees
    };
  }
};
</script>
<style>
.list-container {
    min-height: 440px;
    width: 100%;
    height: auto;
    position: absolute;
    top: 0;
    bottom: 0;
}
</style>
