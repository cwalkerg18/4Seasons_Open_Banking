<template>
  <dx-chart
    id="chart"
    :data-source="dataSource"
  >
    <dx-series
      argument-field="day"
      value-field="oranges"
      name="My oranges"
      type="bar"
      color="#ffaa66"
    />
  </dx-chart>
</template>
<script>
import { DxChart, DxSeries } from 'devextreme-vue/chart';
import { dataSource } from './data.js';

export default {
  components: {
    DxChart,
    DxSeries
  },
  data() {
    return {
      dataSource,
    };
  }
};
</script>
<style>
#chart {
    height: 440px;
}
</style>
