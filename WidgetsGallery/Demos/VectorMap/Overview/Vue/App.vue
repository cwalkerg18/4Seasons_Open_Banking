<template>
  <dx-vector-map
    id="vector-map"
    :bounds="bounds"
    @tooltip-shown="onTooltipShown"
  >
    <dx-layer
      :data-source="mapsWorld"
      :color-groups="colorGroups"
      :customize="customizeLayer"
      name="areas"
      color-grouping-field="total"
    >
      <dx-label
        :enabled="true"
        data-field="name"
      />
    </dx-layer>

    <dx-legend :customize-text="customizeLegendText">
      <dx-source
        layer="areas"
        grouping="color"
      />
    </dx-legend>

    <dx-title text="Nominal GDP">
      <dx-subtitle text="(in millions of US dollars)"/>
    </dx-title>

    <dx-tooltip
      :enabled="true"
      :customize-tooltip="customizeTooltip"
    />
    <dx-export :enabled="true"/>
  </dx-vector-map>
</template>
<script>

import * as mapsData from 'devextreme/dist/js/vectormap-data/world.js';

import {
  DxVectorMap,
  DxExport,
  DxLabel,
  DxLayer,
  DxLegend,
  DxSource,
  DxSubtitle,
  DxTitle,
  DxTooltip
} from 'devextreme-vue/vector-map';

import DxPieChart from 'devextreme/viz/pie_chart';

import { countriesGDP } from './data.js';

const format = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 0
}).format;

export default {
  components: {
    DxVectorMap,
    DxExport,
    DxLabel,
    DxLayer,
    DxLegend,
    DxSource,
    DxSubtitle,
    DxTitle,
    DxTooltip
  },
  data: function() {
    return {
      colorGroups: [0, 10000, 50000, 100000, 500000, 1000000, 10000000, 50000000],
      customizeLayer: function(elements) {
        elements.forEach(function(element) {
          var countryGDPData = countriesGDP[element.attribute('name')];
          element.attribute('total', countryGDPData && countryGDPData.total || 0);
        });
      },
      mapsWorld: mapsData.world,
      customizeLegendText: function(arg) {
        return `${format(arg.start)} to ${format(arg.end)}`;
      },
      customizeTooltip: function(arg) {
        let countryGDPData = countriesGDP[arg.attribute('name')];
        let total = countryGDPData && countryGDPData.total;
        let totalMarkupString = total ? `<div id='nominal' >Nominal GDP: $${total}M</div>` : '';
        let node = `<div #gdp><h4>${arg.attribute('name')}</h4>${
          totalMarkupString
        }<div id='gdp-sectors'></div></div>`;
        return {
          html: node
        };
      },
      bounds: [-180, 85, 180, -60]
    };
  },
  methods: {
    onTooltipShown(e) {
      let name = e.target.attribute('name'),
        gdpData = countriesGDP[name] ? [
          { name: 'industry', value: countriesGDP[name].industry },
          { name: 'services', value: countriesGDP[name].services },
          { name: 'agriculture', value: countriesGDP[name].agriculture }
        ] : null,
        container = document.getElementById('gdp-sectors');
      if (gdpData) {
        new DxPieChart(container, this.getPieChartConfig(gdpData));
      } else {
        container.textContent = 'No economic development data';
      }
    },
    getPieChartConfig(chartData) {
      return {
        dataSource: chartData,
        series: [{
          valueField: 'value',
          argumentField: 'name',
          label: {
            visible: true,
            connector: {
              visible: true,
              width: 1
            },
            customizeText: function(pointInfo) {
              return `${pointInfo.argument[0].toUpperCase()}${
                pointInfo.argument.slice(1)
              }: $${pointInfo.value}M`;
            }
          }
        }],
        legend: {
          visible: false
        }
      };
    }
  }
};
</script>
<style>
#vector-map {
    height: 500px;
    width: 100%;
    display: block;
}
h4 {
    font-size: 14px;
    margin-bottom: 5px;
}
#gdp-sectors {
    width: 400px;
    height: 200px;
    display: block;
}
</style>
