<template>
  <dx-pie-chart
    id="pie"
    :data-source="populationByRegions"
    type="doughnut"
    title="The Population of Continents and Regions"
    palette="Soft Pastel"
  >
    <dx-series argument-field="region">
      <dx-label
        :visible="true"
        format="millions"
      >
        <dx-connector :visible="true"/>
      </dx-label>
    </dx-series>
    <dx-export :enabled="true"/>
    <dx-legend
      :margin="0"
      horizontal-alignment="right"
      vertical-alignment="top"
    />
    <dx-tooltip
      :enabled="true"
      :customize-tooltip="customizeTooltip"
    >
      <dx-format
        type="millions"
      />
    </dx-tooltip>
  </dx-pie-chart>
</template>
<script>

import DxPieChart, {
  DxLegend,
  DxSeries,
  DxTooltip,
  DxFormat,
  DxLabel,
  DxConnector,
  DxExport
} from 'devextreme-vue/pie-chart';

import { populationByRegions } from './data.js';

export default {
  components: {
    DxPieChart,
    DxLegend,
    DxSeries,
    DxTooltip,
    DxFormat,
    DxLabel,
    DxConnector,
    DxExport
  },
  data() {
    return {
      customizeTooltip(arg) {
        return {
          text: `${arg.valueText} - ${(arg.percent * 100).toFixed(2)}%`
        };
      }
    };
  },
  computed: {
    populationByRegions() {
      return populationByRegions;
    }
  }
};
</script>
<style>
#pie {
    height: 440px;
}
</style>
