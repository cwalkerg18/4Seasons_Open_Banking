<template>
  <dx-pie-chart
    id="pie"
    :data-source="internetLanguages"
    type="doughnut"
    title="Top Internet Languages"
    palette="Soft Pastel"
  >
    <dx-series
      argument-field="language"
      value-field="percent"
    >
      <dx-small-values-grouping
        :top-count="3"
        mode="topN"
      />
      <dx-label
        :visible="true"
        :customize-text="customizeLabel"
        format="fixedPoint"
      >
        <dx-connector
          :visible="true"
          :width="1"
        />
      </dx-label>
    </dx-series>
    <dx-export :enabled="true"/>
    <dx-legend
      horizontal-alignment="center"
      vertical-alignment="bottom"
    />
  </dx-pie-chart>
</template>
<script>

import DxPieChart, {
  DxSmallValuesGrouping,
  DxLegend,
  DxSeries,
  DxFormat,
  DxLabel,
  DxConnector,
  DxExport
} from 'devextreme-vue/pie-chart';

import { internetLanguages } from './data.js';

export default {
  components: {
    DxPieChart,
    DxSmallValuesGrouping,
    DxLegend,
    DxSeries,
    DxFormat,
    DxLabel,
    DxConnector,
    DxExport
  },
  data() {
    return {
      customizeLabel(point) {
        return `${point.argumentText }: ${ point.valueText }%`;
      }
    };
  },
  computed: {
    internetLanguages() {
      return internetLanguages;
    }
  }
};
</script>
<style>
#pie {
    height: 440px;
}
</style>
