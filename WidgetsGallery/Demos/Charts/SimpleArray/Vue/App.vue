<template>
  <dx-chart
    id="chart"
    :data-source="populationData"
    title="World Population by Decade"
  >
    <dx-argument-axis :tick-interval="10">
      <dx-label format="decimal"/>
    </dx-argument-axis>
    <dx-series type="bar"/>
    <dx-legend :visible="false"/>
  </dx-chart>
</template>
<script>

import DxChart, {
  DxArgumentAxis,
  DxLegend,
  DxLabel,
  DxSeries
} from 'devextreme-vue/chart';

import { populationData } from './data.js';

export default {
  components: {
    DxChart,
    DxArgumentAxis,
    DxLabel,
    DxLegend,
    DxSeries
  },
  computed: {
    populationData() {
      return populationData;
    }
  }
};
</script>
<style>
#chart {
    height: 440px;
}
</style>
