<template>
  <dx-chart
    id="chart"
    :data-source="dataSource"
    palette="Soft"
    title="Percent of Total Energy Production"
  >
    <dx-common-series-settings
      :ignore-empty-points="true"
      argument-field="state"
      type="bar"
    />
    <dx-series
      value-field="oil"
      name="Oil Production"
    />
    <dx-series
      value-field="gas"
      name="Gas Production"
    />
    <dx-series
      value-field="coal"
      name="Coal Production"
    />
    <dx-legend
      vertical-alignment="bottom"
      horizontal-alignment="center"
    />
    <dx-export :enabled="true"/>
  </dx-chart>
</template>
<script>
import {
  DxChart,
  DxSeries,
  DxCommonSeriesSettings,
  DxLegend,
  DxExport
} from 'devextreme-vue/chart';

import { dataSource } from './data.js';

export default {
  components: {
    DxChart,
    DxSeries,
    DxCommonSeriesSettings,
    DxLegend,
    DxExport
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
