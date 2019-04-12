<template>
  <div v-if="connectionStarted">
    <dx-chart
      id="chart"
      :data-source="dataSource"
      :margin="{right: 30}"
      :on-zoom-end="zoomEnd"
      zooming-mode="all"
      scrolling-mode="all"
      title="Stock Price"
    >

      <dx-series
        argument-field="date"
        type="candlestick"
      >
        <dx-aggregation
          :enabled="true"
          :calculate="calculateCandle"
          method="custom"
        />
      </dx-series>
      <dx-legend :visible="false"/>
      <dx-argument-axis
        :value-margins-enabled="false"
        :visual-range="{length: 'hour'}"
        argument-type="datetime"
      />
      <dx-zoom-and-pan argument-axis="both"/>
      <dx-value-axis :placeholder-size="50"/>
      <dx-scroll-bar :visible="true"/>
      <dx-loading-indicator :show="true"/>
    </dx-chart>
  </div>
</template>
<script>

import {
  DxChart,
  DxArgumentAxis,
  DxValueAxis,
  DxAggregation,
  DxSeries,
  DxLegend,
  DxScrollBar,
  DxZoomAndPan,
  DxLoadingIndicator
} from 'devextreme-vue/chart';
import CustomStore from 'devextreme/data/custom_store';
import { HubConnectionBuilder } from '@aspnet/signalr';

export default {
  components: {
    DxChart,
    DxArgumentAxis,
    DxValueAxis,
    DxAggregation,
    DxLegend,
    DxSeries,
    DxScrollBar,
    DxZoomAndPan,
    DxLoadingIndicator
  },
  data() {
    return {
      connectionStarted: false,
      dataSource: null,
      calculateCandle(e) {
        const prices = e.data.map(d => d.price);
        if (prices.length) {
          return {
            date: e.intervalStart,
            open: prices[0],
            high: Math.max.apply(null, prices),
            low: Math.min.apply(null, prices),
            close: prices[prices.length - 1]
          };
        }
      },
      zoomEnd(e) {
        if (e.range.endValue - e.range.startValue < 1000 * 60 * 10) {
          e.cancel = true;
        }
      }
    };
  },
  mounted() {
    var hubConnection = new HubConnectionBuilder()
      .withUrl('https://js.devexpress.com/Demos/NetCore/stockTickDataHub')
      .build();

    var store = new CustomStore({
      load: () => hubConnection.invoke('getAllData'),
      key: 'date'
    });

    hubConnection
      .start()
      .then(() => {
        hubConnection.on('updateStockPrice', (data) => {
          store.push([{ type: 'insert', key: data.date, data: data }]);
        });
        this.dataSource = store;
        this.connectionStarted = true;
      });
  }
};
</script>

<style>
#chart {
    height: 440px;
}
</style>
