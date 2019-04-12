<template>
  <dx-chart
    id="chart"
    :data-source="dataSource"
    title="Population: Age Structure"
  >
    <dx-common-series-settings
      argument-field="state"
      type="stackedbar"
    />
    <dx-value-axis>
      <dx-title text="Populations, millions"/>
    </dx-value-axis>
    <dx-series
      value-field="maleyoung"
      name="Male: 0-14"
      stack="male"
    />
    <dx-series
      value-field="malemiddle"
      name="Male: 15-64"
      stack="male"
    />
    <dx-series
      value-field="maleolder"
      name="Male: 65 and older"
      stack="male"
    />
    <dx-series
      value-field="femaleyoung"
      name="Female: 0-14"
      stack="female"
    />
    <dx-series
      value-field="femalemiddle"
      name="Female: 15-64"
      stack="female"
    />
    <dx-series
      value-field="femaleolder"
      name="Female: 65 and older"
      stack="female"
    />
    <dx-legend
      position="inside"
      horizontal-alignment="right"
    >
      <dx-border :visible="true"/>
    </dx-legend>
    <dx-export :enabled="true"/>
    <dx-tooltip :enabled="true"/>
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
  DxBorder,
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
    DxBorder,
    DxExport,
    DxTooltip
  },
  data() {
    return {
      dataSource: service.getMaleAgeData()
    };
  }
};
</script>
<style>
#chart {
    height: 440px;
}
</style>
