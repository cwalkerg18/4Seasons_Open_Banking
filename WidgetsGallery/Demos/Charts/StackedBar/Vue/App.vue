<template>
  <dx-chart
    id="chart"
    :data-source="dataSource"
    title="Male Age Structure"
  >
    <dx-common-series-settings
      argument-field="state"
      type="stackedbar"
    />
    <dx-value-axis position="right">
      <dx-title text="millions"/>
    </dx-value-axis>
    <dx-series
      value-field="young"
      name="0-14"
    />
    <dx-series
      value-field="middle"
      name="15-64"
    />
    <dx-series
      value-field="older"
      name="65 and older"
    />
    <dx-legend
      vertical-alignment="bottom"
      horizontal-alignment="center"
      item-text-position="top"
    />
    <dx-export :enabled="true"/>
    <dx-tooltip
      :enabled="true"
      :customize-tooltip="customizeTooltip"
      location="edge"
    />
  </dx-chart>
</template>
<script>
import {
  DxChart,
  DxSeries,
  DxCommonSeriesSettings,
  DxValueAxis,
  DxTitle,
  DxLegend,
  DxExport,
  DxTooltip
} from 'devextreme-vue/chart';

import service from './data.js';

export default {
  components: {
    DxChart,
    DxSeries,
    DxCommonSeriesSettings,
    DxValueAxis,
    DxTitle,
    DxLegend,
    DxExport,
    DxTooltip
  },
  data() {
    return {
      dataSource: service.getMaleAgeData()
    };
  },
  methods: {
    customizeTooltip: (arg) => {
      return {
        text: `${arg.seriesName } years: ${ arg.valueText}`
      };
    }
  }
};
</script>
<style>
#chart {
    height: 440px;
}
</style>
