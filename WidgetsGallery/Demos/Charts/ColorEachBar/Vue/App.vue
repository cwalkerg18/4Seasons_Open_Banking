<template>
  <dx-chart
    id="chart"
    :data-source="dataSource"
    palette="Soft"
  >
    <dx-common-series-settings
      :ignore-empty-points="true"
      argument-field="age"
      value-field="number"
      type="bar"
    />
    <dx-series-template name-field="age"/>
    <dx-title
      text="Age Breakdown of Facebook Users in the U.S."
      subtitle="as of January 2017"
    />
  </dx-chart>
</template>
<script>
import {
  DxChart,
  DxSeriesTemplate,
  DxCommonSeriesSettings,
  DxTitle
} from 'devextreme-vue/chart';

import { dataSource } from './data.js';

export default {
  components: {
    DxChart,
    DxSeriesTemplate,
    DxCommonSeriesSettings,
    DxTitle
  },
  data() {
    return {
      dataSource: dataSource
    };
  }
};
</script>
<style>
#chart {
    height: 440px;
}
</style>
