<template>
  <dx-chart
    id="chart"
    :data-source="dataSource"
    :rotated="true"
    :bar-group-width="18"
    title="Population Pyramid For Norway 2016"
  >
    <dx-common-series-settings
      argument-field="age"
      type="stackedbar"
    />
    <dx-series
      value-field="male"
      name="Male"
      color="#3F7FBF"
    />
    <dx-series
      value-field="female"
      name="Female"
      color="#F87CCC"
    />
    <dx-tooltip
      :enabled="true"
      :customize-tooltip="customizeTooltip"
    />
    <dx-value-axis>
      <dx-label :customize-text="customizeLabel"/>
    </dx-value-axis>
    <dx-legend
      :margin="{left: 50}"
      vertical-alignment="bottom"
      horizontal-alignment="center"
    />
  </dx-chart>
</template>
<script>

import DxChart, {
  DxCommonSeriesSettings,
  DxValueAxis,
  DxLabel,
  DxLegend,
  DxSeries,
  DxTooltip
} from 'devextreme-vue/chart';

import { dataSource } from './data.js';

export default {
  components: {
    DxChart,
    DxCommonSeriesSettings,
    DxValueAxis,
    DxLabel,
    DxLegend,
    DxSeries,
    DxTooltip
  },
  computed: {
    dataSource() {
      return dataSource;
    }
  },
  methods: {
    customizeTooltip(e) {
      return { text: Math.abs(e.valueText) };
    },
    customizeLabel(e) {
      return `${Math.abs(e.value)}%`;
    }
  }
};
</script>
<style>
#chart {
    height: 549px;
    width: 820px;
    margin: 0 auto;
}
</style>
