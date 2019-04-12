<template>
  <dx-chart
    id="chart"
    :data-source="dataSource"
    palette="Soft"
  >
    <dx-common-series-settings
      :bar-padding="0.5"
      argument-field="state"
      type="bar"
    />
    <dx-series
      value-field="year1970"
      name="1970"
    />
    <dx-series
      value-field="year1980"
      name="1980"
    />
    <dx-series
      value-field="year1990"
      name="1990"
    />
    <dx-series
      value-field="year2000"
      name="2000"
    />
    <dx-series
      value-field="year2008"
      name="2008"
    />
    <dx-series
      value-field="year2009"
      name="2009"
    />
    <dx-legend
      vertical-alignment="bottom"
      horizontal-alignment="center"
    />
    <dx-export :enabled="true"/>
    <dx-title
      text="Oil Production"
      subtitle="(in millions tonnes)"
    />
  </dx-chart>
</template>
<script>
import {
  DxChart,
  DxSeries,
  DxCommonSeriesSettings,
  DxLegend,
  DxExport,
  DxTitle
} from 'devextreme-vue/chart';

import { dataSource } from './data.js';

export default {
  components: {
    DxChart,
    DxSeries,
    DxCommonSeriesSettings,
    DxLegend,
    DxExport,
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
