<template>
  <div class="chart-cell">
    <dx-sparkline
      :data-source="cellData"
      :show-min-max="true"
      :point-size="6"
      argument-field="date"
      value-field="close"
      type="line"
      min-color="#f00"
      max-color="#2ab71b"
    >
      <dx-size
        :width="290"
        :height="40"
      />
      <dx-tooltip :enabled="false"/>
    </dx-sparkline>
  </div>
</template>
<script>
import {
  DxSparkline,
  DxSize,
  DxTooltip
} from 'devextreme-vue/sparkline';

export default {
  components: {
    DxSparkline,
    DxSize,
    DxTooltip
  },
  props: {
    cellData: {
      type: Array,
      default: () => []
    }
  }
};
</script>
