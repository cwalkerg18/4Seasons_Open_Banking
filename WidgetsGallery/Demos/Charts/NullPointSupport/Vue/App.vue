<template>
  <dx-chart
    id="chart"
    :data-source="medalsInfo"
    title="France Olympic Medals"
  >
    <dx-series
      value-field="gold"
      name="Gold Medals"
      color="#ffd700"
    />
    <dx-series
      value-field="silver"
      name="Silver Medals"
      color="#c0c0c0"
    />
    <dx-common-series-settings
      argument-field="year"
      type="steparea"
    >
      <dx-point :visible="true"/>
    </dx-common-series-settings>
    <dx-argument-axis>
      <dx-label format="decimal"/>
    </dx-argument-axis>
    <dx-legend
      vertical-alignment="bottom"
      horizontal-alignment="center"
    />
    <dx-export :enabled="true"/>
  </dx-chart>
</template>
<script>

import DxChart, {
  DxArgumentAxis,
  DxLabel,
  DxLegend,
  DxSeries,
  DxCommonSeriesSettings,
  DxExport,
  DxPoint
} from 'devextreme-vue/chart';

import { medalsInfo } from './data.js';

export default {
  components: {
    DxChart,
    DxArgumentAxis,
    DxLabel,
    DxLegend,
    DxSeries,
    DxCommonSeriesSettings,
    DxExport,
    DxPoint
  },
  computed: {
    medalsInfo() {
      return medalsInfo;
    }
  }
};
</script>
<style>
#chart {
    height: 440px;
    width: 100%;
}
</style>
