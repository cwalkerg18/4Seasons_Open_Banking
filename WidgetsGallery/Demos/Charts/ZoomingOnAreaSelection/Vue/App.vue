<template>
  <div>
    <dx-chart
      id="chart"
      :data-source="birthLife"
      :on-initialized="saveChartInstance"
      title="Life Expectancy vs. Birth Rates"
    >

      <dx-argument-axis title="Life Expectancy"/>
      <dx-value-axis title="Birth Rate"/>

      <dx-series-template
        name-field="year"
      />
      <dx-common-series-settings
        type="scatter"
        argument-field="life_exp"
        value-field="birth_rate"
      >
        <dx-point :size="8"/>
      </dx-common-series-settings>
      <dx-zoom-and-pan
        :drag-to-zoom="true"
        :allow-mouse-wheel="true"
        value-axis="both"
        argument-axis="both"
        pan-key="shift"
      />
      <dx-crosshair
        :enabled="true"
      >
        <dxLabel :visible="true"/>
      </dx-crosshair>
      <dx-legend
        position="inside"
      >
        <dx-border :visible="true"/>
      </dx-legend>
      <dx-tooltip
        :enabled="true"
        :customize-tooltip="customizeTooltip"
      />
    </dx-chart>

    <dx-button
      id="reset-zoom"
      :on-click="resetZoom"
      text="Reset"
    />
  </div>
</template>
<script>

import DxChart, {
  DxArgumentAxis,
  DxValueAxis,
  DxCommonSeriesSettings,
  DxSeriesTemplate,
  DxPoint,
  DxTooltip,
  DxLabel,
  DxZoomAndPan,
  DxCrosshair,
  DxLegend,
  DxBorder
} from 'devextreme-vue/chart';

import DxButton from 'devextreme-vue/button';

import { birthLife } from './data.js';

export default {
  components: {
    DxChart,
    DxButton,
    DxArgumentAxis,
    DxValueAxis,
    DxCommonSeriesSettings,
    DxSeriesTemplate,
    DxPoint,
    DxTooltip,
    DxLabel,
    DxLegend,
    DxZoomAndPan,
    DxCrosshair,
    DxBorder
  },
  data() {
    let chartInstance = null;
    return {
      birthLife,

      saveChartInstance(e) {
        chartInstance = e.component;
      },

      resetZoom() {
        chartInstance.resetVisualRange();
      },

      customizeTooltip(arg) {
        const data = arg.point.data;
        return {
          text: `${data.country} ${data.year}`
        };
      }
    };
  }
};
</script>
<style>
#chart {
    height: 440px;
    width: 100%;
}

#reset-zoom {
   position: absolute;
   right: 10px;
   top: 5px;
}
</style>
