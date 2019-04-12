<template>
  <dx-chart
    id="chart"
    :data-source="dataSource"
    palette="Violet"
  >
    <dx-series-template
      :customize-series="customizeSeries"
      name-field="year"
    />
    <dx-common-series-settings
      argument-field="country"
      value-field="oil"
      type="bar"
    />
    <dx-title text="Oil Production">
      <dx-subtitle text="(in millions tonnes)"/>
    </dx-title>
    <dx-legend
      vertical-alignment="bottom"
      horizontal-alignment="center"
    />
    <dx-export :enabled="true"/>
  </dx-chart>
</template>
<script>

import DxChart, {
  DxLegend,
  DxSeriesTemplate,
  DxTitle,
  DxSubtitle,
  DxCommonSeriesSettings,
  DxExport
} from 'devextreme-vue/chart';

import { dataSource } from './data.js';

export default {
  components: {
    DxChart,
    DxLegend,
    DxSeriesTemplate,
    DxTitle,
    DxSubtitle,
    DxCommonSeriesSettings,
    DxExport
  },
  data() {
    return {
      dataSource
    };
  },
  methods: {
    customizeSeries(valueFromNameField) {
      return valueFromNameField === 2009 ? { type: 'line', label: { visible: true }, color: '#ff3f7a' } : {};
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
