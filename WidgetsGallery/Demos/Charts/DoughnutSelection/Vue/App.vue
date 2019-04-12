<template>
  <dx-pie-chart
    id="pie"
    :data-source="olympicMedals"
    type="doughnut"
    title="Olympic Medals in 2008"
    palette="Soft Pastel"
    @point-click="pointClickHandler"
  >
    <dx-series
      argument-field="country"
      value-field="medals"
    >
      <dx-hover-style color="#ffd700"/>
    </dx-series>
    <dx-export :enabled="true"/>
    <dx-legend
      :margin="0"
      horizontal-alignment="right"
      vertical-alignment="top"
    />
  </dx-pie-chart>
</template>
<script>
import DxPieChart, {
  DxLegend,
  DxSeries,
  DxExport,
  DxHoverStyle
} from 'devextreme-vue/pie-chart';

import { olympicMedals } from './data.js';

export default {
  components: {
    DxPieChart,
    DxLegend,
    DxSeries,
    DxExport,
    DxHoverStyle
  },
  data() {
    return {
      pointClickHandler(arg) {
        arg.target.select();
      }
    };
  },
  computed: {
    olympicMedals() {
      return olympicMedals;
    }
  }
};
</script>
<style>
#pie {
  height: 440px;
}
</style>
