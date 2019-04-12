<template>
  <dx-chart
    id="chart"
    :data-source="dataSource"
    title="Gross State Product within the Great Lakes Region"
    @pointClick="onPointClick"
  >
    <dx-common-series-settings
      argument-field="state"
      type="bar"
      hover-mode="allArgumentPoints"
      selection-mode="allArgumentPoints"
    >
      <dx-label :visible="true">
        <dx-format
          :precision="0"
          type="fixedPoint"
        />
      </dx-label>
    </dx-common-series-settings>
    <dx-series
      value-field="year2004"
      name="2004"
    />
    <dx-series
      value-field="year2001"
      name="2001"
    />
    <dx-series
      value-field="year1998"
      name="1998"
    />
    <dx-legend
      vertical-alignment="bottom"
      horizontal-alignment="center"
    />
    <dx-export :enabled="true"/>
  </dx-chart>
</template>
<script>
import {
  DxChart,
  DxSeries,
  DxCommonSeriesSettings,
  DxLabel,
  DxFormat,
  DxLegend,
  DxExport
} from 'devextreme-vue/chart';
import { grossProductData } from './data.js';

export default {
  components: {
    DxChart,
    DxSeries,
    DxCommonSeriesSettings,
    DxLabel,
    DxFormat,
    DxLegend,
    DxExport
  },
  data() {
    return {
      dataSource: grossProductData
    };
  },
  methods: {
    onPointClick: function(e) {
      e.target.select();
    }
  }
};
</script>
<style>
#chart {
    height: 440px;
}
</style>
