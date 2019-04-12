<template>
  <dx-chart
    id="chart"
    :data-source="dataSource"
  >
    <dx-common-series-settings
      argument-field="country"
      type="fullstackedbar"
    />
    <dx-title
      text="Energy Consumption in 2004"
      subtitle="(Millions of Tons, Oil Equivalent)"
    />
    <dx-series
      value-field="hydro"
      name="Hydro-electric"
    />
    <dx-series
      value-field="oil"
      name="Oil"
    />
    <dx-series
      value-field="gas"
      name="Natural gas"
    />
    <dx-series
      value-field="coal"
      name="Coal"
    />
    <dx-series
      value-field="nuclear"
      name="Nuclear"
    />
    <dx-legend
      vertical-alignment="top"
      horizontal-alignment="center"
      item-text-position="right"
    />
    <dx-export :enabled="true"/>
    <dx-tooltip
      :enabled="true"
      :customize-tooltip="customizeTooltip"
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
      dataSource: service.dataSource(),
      customizeTooltip: (arg) => {
        return {
          text: `${arg.percentText } years: ${ arg.valueText}`
        };
      }
    };
  }
};
</script>
<style>
#chart {
    height: 440px;
}
</style>
