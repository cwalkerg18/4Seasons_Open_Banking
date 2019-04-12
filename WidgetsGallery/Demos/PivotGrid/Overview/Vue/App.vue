<template>
  <div>
    <dx-chart ref="chart">
      <dx-tooltip
        :enabled="true"
        :customize-tooltip="customizeTooltip"
      />
      <dx-adaptive-layout :width="450"/>
      <dx-size :height="200"/>
      <dx-common-series-settings type="bar"/>
    </dx-chart>

    <dx-pivot-grid
      ref="grid"
      :data-source="dataSource"
      :allow-sorting-by-summary="true"
      :allow-filtering="true"
      :show-borders="true"
      :show-column-grand-totals="false"
      :show-row-grand-totals="false"
      :show-row-totals="false"
      :show-column-totals="false"
    >
      <dx-field-chooser
        :enabled="true"
        :height="400"
      />
    </dx-pivot-grid>
  </div>
</template>
<script>

import {
  DxChart,
  DxAdaptiveLayout,
  DxCommonSeriesSettings,
  DxSize,
  DxTooltip,
} from 'devextreme-vue/chart';

import {
  DxPivotGrid,
  DxFieldChooser
} from 'devextreme-vue/pivot-grid';

import { sales } from './data.js';

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0
});

export default {
  components: {
    DxChart,
    DxAdaptiveLayout,
    DxCommonSeriesSettings,
    DxSize,
    DxTooltip,
    DxPivotGrid,
    DxFieldChooser
  },
  data() {
    return {
      dataSource: {
        fields: [{
          caption: 'Region',
          width: 120,
          dataField: 'region',
          area: 'row',
          sortBySummaryField: 'Total'
        }, {
          caption: 'City',
          dataField: 'city',
          width: 150,
          area: 'row'
        }, {
          dataField: 'date',
          dataType: 'date',
          area: 'column'
        }, {
          groupName: 'date',
          groupInterval: 'month',
          visible: false
        }, {
          caption: 'Total',
          dataField: 'amount',
          dataType: 'number',
          summaryType: 'sum',
          format: 'currency',
          area: 'data'
        }],
        store: sales
      },
      customizeTooltip: function(args) {
        const valueText = currencyFormatter.format(args.originalValue);
        return {
          html: `${args.seriesName} | Total<div class='currency'>${valueText}</div>`
        };
      }
    };
  },
  mounted() {
    const pivotGrid = this.$refs.grid.instance;
    const chart = this.$refs.chart.instance;
    pivotGrid.bindChart(chart, {
      dataFieldsDisplayMode: 'splitPanes',
      alternateDataFields: false
    });
    const dataSource = pivotGrid.getDataSource();
    setTimeout(function() {
      dataSource.expandHeaderItem('row', ['North America']);
      dataSource.expandHeaderItem('column', [2013]);
    }, 0);
  }
};
</script>
<style>
.dx-pivotgrid {
    margin-top: 20px;
}
.currency {
    text-align: center;
}
</style>
