<template>
  <dx-chart
    id="chart"
    :data-source="dataSource"
    title="Australian Medal Count"
  >
    <dx-series
      value-field="bronze"
      name="Bronze Medals"
      color="#cd7f32"
    />
    <dx-series
      value-field="silver"
      name="Silver Medals"
      color="#c0c0c0"
    />
    <dx-series
      value-field="gold"
      name="Gold Medals"
      color="#ffd700"
    />
    <dx-common-series-settings
      type="steparea"
      argument-field="year"
    >
      <dx-border :visible="false"/>
    </dx-common-series-settings>
    <dx-argument-axis :value-margins-enabled="false">
      <dx-label format="decimal"/>
    </dx-argument-axis>
    <dx-export :enabled="true"/>
    <dx-legend
      vertical-alignment="bottom"
      horizontal-alignment="center"
    />
  </dx-chart>
</template>
<script>

import DxChart, {
  DxArgumentAxis,
  DxSeries,
  DxCommonSeriesSettings,
  DxLabel,
  DxLegend,
  DxBorder,
  DxExport
} from 'devextreme-vue/chart';

import { dataSource } from './data.js';

export default {
  components: {
    DxChart,
    DxArgumentAxis,
    DxSeries,
    DxCommonSeriesSettings,
    DxLabel,
    DxLegend,
    DxBorder,
    DxExport
  },
  computed: {
    dataSource() {
      return dataSource;
    }
  }
};
</script>
<style>
#chart {
    height: 440px;
}
</style>
