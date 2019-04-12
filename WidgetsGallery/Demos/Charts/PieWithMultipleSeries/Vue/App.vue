<template>
  <dx-pie-chart
    id="pie"
    :data-source="exportImportData"
    :inner-radius="0.2"
    type="doughnut"
    palette="Ocean"
  >
    <dx-title text="Imports/Exports of Goods and Services">
      <dx-subtitle text="(billion US$, 2012)"/>
    </dx-title>
    <dx-legend :visible="true"/>
    <dx-export :enabled="true"/>
    <dx-common-series-settings>
      <dx-label :visible="false"/>
    </dx-common-series-settings>
    <dx-tooltip
      :enabled="true"
      :customize-tooltip="customizeTooltip"
      format="currency"
    />
    <dx-series
      name="Export"
      argument-field="Country"
      value-field="Export"
    />
    <dx-series
      name="Import"
      argument-field="Country"
      value-field="Import"
    />
  </dx-pie-chart>
</template>
<script>
import DxPieChart, {
  DxCommonSeriesSettings,
  DxLegend,
  DxSeries,
  DxExport,
  DxLabel,
  DxTitle,
  DxTooltip,
  DxSubtitle
} from 'devextreme-vue/pie-chart';

import { exportImportData } from './data.js';

export default {
  components: {
    DxPieChart,
    DxCommonSeriesSettings,
    DxLegend,
    DxSeries,
    DxExport,
    DxLabel,
    DxTitle,
    DxTooltip,
    DxSubtitle
  },
  data() {
    return {
      customizeTooltip(arg) {
        return {
          text:
            `${arg.argumentText
            }<br>${
              arg.seriesName
            }: ${
              arg.valueText
            }B`
        };
      }
    };
  },
  computed: {
    exportImportData() {
      return exportImportData;
    }
  }
};
</script>
<style>
#pie {
  height: 440px;
}
</style>
