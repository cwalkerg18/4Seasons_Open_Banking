<template>
  <dx-chart
    id="chart"
    :rotated="true"
    data-source="../../../../data/simpleJSON.json"
    title="Daily Sales"
  >

    <dx-argument-axis>
      <dx-label :customize-text="customizeLabelText"/>
    </dx-argument-axis>

    <dx-value-axis>
      <dx-label :visible="false"/>
    </dx-value-axis>

    <dx-series
      argument-field="day"
      value-field="sales"
      type="bar"
      color="#79cac4"
    >
      <dx-label
        :visible="true"
        background-color="#c18e92"
      />
    </dx-series>

    <dx-legend :visible="false"/>

    <dx-export :enabled="true"/>

  </dx-chart>
</template>
<script>

import DxChart, {
  DxArgumentAxis,
  DxExport,
  DxSeries,
  DxValueAxis,
  DxLabel,
  DxLegend
} from 'devextreme-vue/chart';

export default {
  components: {
    DxChart,
    DxArgumentAxis,
    DxExport,
    DxSeries,
    DxValueAxis,
    DxLabel,
    DxLegend
  },
  data() {
    return {
      customizeLabelText(e) {
        return `Day ${e.valueText}`;
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
