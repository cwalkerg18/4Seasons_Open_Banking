<template>
  <div id="chart-demo">
    <dx-chart
      id="chart"
      :data-source="dataSource"
      palette="Violet"
    >
      <dx-common-series-settings
        :type="type"
        argument-field="country"
      />
      <dx-series
        v-for="energy in energySources"
        :key="energy.value"
        :value-field="energy.value"
        :name="energy.name"
      />
      <dx-margin :bottom="20"/>
      <dx-argument-axis
        :value-margins-enabled="false"
        discrete-axis-division-mode="crossLabels"
      >
        <dx-grid :visible="true"/>
      </dx-argument-axis>
      <dx-legend
        vertical-alignment="bottom"
        horizontal-alignment="center"
        item-text-position="bottom"
      />
      <dx-export :enabled="true"/>
      <dx-title text="Energy Consumption in 2004">
        <dx-subtitle text="(Millions of Tons, Oil Equivalent)"/>
      </dx-title>
      <dx-tooltip
        :enabled="true"
        :customize-tooltip="customizeTooltip"
      />
    </dx-chart>
    <div class="options">
      <div class="caption">Options</div>
      <div class="option">
        <span>Series Type</span>
        <dx-select-box
          :data-source="types"
          :value.sync="type"
        />
      </div>
    </div>
  </div>
</template>
<script>
import {
  DxChart,
  DxSeries,
  DxArgumentAxis,
  DxCommonSeriesSettings,
  DxExport,
  DxGrid,
  DxMargin,
  DxLegend,
  DxTitle,
  DxSubtitle,
  DxTooltip
} from 'devextreme-vue/chart';
import DxSelectBox from 'devextreme-vue/select-box';

import service from './data.js';

export default {

  components: {
    DxSelectBox,
    DxChart,
    DxSeries,
    DxArgumentAxis,
    DxCommonSeriesSettings,
    DxExport,
    DxGrid,
    DxMargin,
    DxLegend,
    DxTitle,
    DxSubtitle,
    DxTooltip
  },

  data() {
    return {
      dataSource: service.getCountriesInfo(),
      energySources: service.getEnergySources(),
      types: ['line', 'stackedline', 'fullstackedline'],
      type: 'line'
    };
  },

  methods: {
    customizeTooltip: (arg) => {
      return {
        text: arg.valueText
      };
    }
  }
};
</script>
<style>
.options {
    padding: 20px;
    background-color: rgba(191, 191, 191, 0.15);
    margin-top: 20px;
}

.option {
    margin-top: 10px;
}

.caption {
    font-size: 18px;
    font-weight: 500;
}

.option > span {
    margin-right: 10px;
}

.option > .dx-widget {
    display: inline-block;
    vertical-align: middle;
}
</style>
