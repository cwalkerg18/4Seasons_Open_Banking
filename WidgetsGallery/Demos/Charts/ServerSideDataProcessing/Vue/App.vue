<template>
  <div id="chart-demo">
    <dx-chart
      :data-source="chartDataSource"
      title="Temperature in Barcelona, 2012"
    >
      <dx-size :height="420"/>
      <dx-value-axis
        :grid="{ opacity: 0.2 }"
        value-type="numeric"
      >
        <dx-label :customize-text="customizeLabelText"/>
      </dx-value-axis>
      <dx-argument-axis type="discrete">
        <dx-grid
          :visible="true"
          :opacity="0.5"
        />
      </dx-argument-axis>
      <dx-common-pane-settings>
        <dx-border
          :visible="true"
          :width="2"
          :top="false"
          :right="false"
        />
      </dx-common-pane-settings>
      <dx-series
        argument-field="Number"
        value-field="Temperature"
        type="spline"
      />
      <dx-legend :visible="false"/>
      <dx-tooltip
        :enabled="true"
        :customize-tooltip="customizeTooltip"
      />
      <dx-export :enabled="true"/>
    </dx-chart>
    <div class="action">
      <dx-select-box
        id="selectbox"
        :width="150"
        :items="months"
        :value="1"
        :on-value-changed="onValueChanged"
        value-expr="id"
        display-expr="name"
      />
      <div class="label">Choose a month:</div>
    </div>
  </div>
</template>
<script>

import DxChart, {
  DxValueAxis,
  DxArgumentAxis,
  DxCommonPaneSettings,
  DxGrid,
  DxSeries,
  DxLegend,
  DxSize,
  DxBorder,
  DxLabel,
  DxTooltip,
  DxExport
} from 'devextreme-vue/chart';

import DxSelectBox from 'devextreme-vue/select-box';

import DataSource from 'devextreme/data/data_source';
import 'devextreme/data/odata/store';

import { months } from './data.js';

export default {
  components: {
    DxChart,
    DxValueAxis,
    DxArgumentAxis,
    DxCommonPaneSettings,
    DxGrid,
    DxSeries,
    DxLegend,
    DxSize,
    DxBorder,
    DxLabel,
    DxTooltip,
    DxExport,

    DxSelectBox
  },
  data() {
    const chartDataSource = new DataSource({
      store: {
        type: 'odata',
        url: 'https://js.devexpress.com/Demos/WidgetsGallery/odata/WeatherItems'
      },
      postProcess: function(results) {
        return results[0].DayItems;
      },
      expand: 'DayItems',
      filter: ['Id', '=', 1],
      paginate: false
    });

    return {
      temperature: [6, 7, 8, 9, 10, 11, 12],
      onValueChanged(data) {
        chartDataSource.filter(['Id', '=', data.value]);
        chartDataSource.load();
      },
      customizeLabelText(e) {
        return `${e.valueText}${'&#176C'}`;
      },
      customizeTooltip(arg) {
        return {
          text: `${arg.valueText}${'&#176C'}`
        };
      },
      months,
      chartDataSource
    };
  }
};
</script>
<style>
#selectbox {
    float: right;
}
.action {
    width: 270px;
    margin-top: 20px;
}
.label {
    padding-top: 9px;
}
</style>
