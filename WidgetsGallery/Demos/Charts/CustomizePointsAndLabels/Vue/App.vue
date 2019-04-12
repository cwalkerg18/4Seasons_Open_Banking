<template>
  <dx-chart
    id="chart"
    :customize-point="customizePoint"
    :customize-label="customizeLabel"
    :data-source="dataSource"
    title="Daily Temperature in May"
  >
    <dx-series
      argument-field="day"
      value-field="value"
      type="bar"
      color="#e7d19a"
    />
    <dx-value-axis :max-value-margin="0.01">
      <dx-visual-range :start-value="40"/>
      <dx-label :customize-text="customizeText"/>
      <dx-constant-line
        :width="2"
        :value="lowAverage"
        color="#8c8cff"
        dash-style="dash"
      >
        <dx-label text="Low Average"/>
      </dx-constant-line>
      <dx-constant-line
        :width="2"
        :value="highAverage"
        color="#ff7c7c"
        dash-style="dash"
      >
        <dx-label text="High Average"/>
      </dx-constant-line>
    </dx-value-axis>

    <dx-legend :visible="false"/>
    <dx-export :enabled="true"/>
  </dx-chart>
</template>
<script>
import {
  DxChart,
  DxSeries,
  DxValueAxis,
  DxVisualRange,
  DxLabel,
  DxConstantLine,
  DxLegend,
  DxExport
} from 'devextreme-vue/chart';

import { temperaturesData } from './data.js';

export default {

  components: {
    DxChart,
    DxSeries,
    DxValueAxis,
    DxVisualRange,
    DxLabel,
    DxConstantLine,
    DxLegend,
    DxExport
  },

  data() {
    return {
      highAverage: 77,
      lowAverage: 58,
      dataSource: temperaturesData
    };
  },

  methods: {

    customizePoint(arg) {
      if (arg.value > this.highAverage) {
        return { color: '#ff7c7c', hoverStyle: { color: '#ff7c7c' } };
      } else if (arg.value < this.lowAverage) {
        return { color: '#8c8cff', hoverStyle: { color: '#8c8cff' } };
      }
    },

    customizeLabel(arg) {
      if (arg.value > this.highAverage) {
        return {
          visible: true,
          backgroundColor: '#ff7c7c',
          customizeText: function(e) {
            return `${e.valueText }&#176F`;
          }
        };
      }
    },

    customizeText(arg) {
      return `${arg.valueText }&#176F`;
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
