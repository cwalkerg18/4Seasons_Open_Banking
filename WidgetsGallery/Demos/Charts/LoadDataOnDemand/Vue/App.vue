<template>
  <dx-chart
    id="chart"
    ref="chart"
    :data-source="chartDataSource"
    title="Temperature in Toronto (2017)"
  >
    <dx-zoom-and-pan argument-axis="pan"/>
    <dx-scroll-bar :visible="true"/>
    <dx-argument-axis
      :visual-range.sync="currentVisualRange"
      :whole-range="bounds"
      argument-type="datetime"
      visual-range-update-mode="keep"
    />
    <dx-value-axis
      :allow-decimals="false"
      name="temperature"
    >
      <dx-title text="Temperature, &deg;C">
        <dx-font color="#ff950c"/>
      </dx-title>
      <dx-label>
        <dx-font color="#ff950c"/>
      </dx-label>
    </dx-value-axis>
    <dx-series
      color="#ff950c"
      type="rangeArea"
      argument-field="date"
      range-value1-field="minTemp"
      range-value2-field="maxTemp"
      name="Temperature range"
    />
    <dx-animation :enabled="false"/>
    <dx-loading-indicator background-color="none">
      <dx-font :size="14"/>
    </dx-loading-indicator>
    <dx-legend :visible="false"/>
  </dx-chart>
</template>
<script>

import DxChart, {
  DxZoomAndPan,
  DxScrollBar,
  DxArgumentAxis,
  DxSeries,
  DxValueAxis,
  DxTitle,
  DxLabel,
  DxFont,
  DxAnimation,
  DxLoadingIndicator,
  DxLegend
} from 'devextreme-vue/chart';

import DataSource from 'devextreme/data/data_source';
import 'whatwg-fetch';

let packetsLock = 0;
const HALFDAY = 43200000;

export default {
  components: {
    DxChart,
    DxZoomAndPan,
    DxScrollBar,
    DxArgumentAxis,
    DxSeries,
    DxValueAxis,
    DxTitle,
    DxLabel,
    DxFont,
    DxAnimation,
    DxLoadingIndicator,
    DxLegend
  },
  data() {
    const chartDataSource = new DataSource({
      store: [],
      sort: 'date',
      paginate: false
    });
    let visualRange = {
      startValue: new Date(2017, 3, 1),
      endValue: new Date(2017, 3, 15)
    };

    return {
      visualRange,
      chartDataSource,
      bounds: {
        startValue: new Date(2017, 0, 1),
        endValue: new Date(2017, 11, 31)
      }
    };
  },
  computed: {
    currentVisualRange: {
      get: function() {
        return this.visualRange;
      },
      set: function(newRange) {
        const stateStart = this.visualRange.startValue;
        const currentStart = newRange.startValue;
        if(stateStart.valueOf() !== currentStart.valueOf()) {
          this.visualRange = newRange;
        }
        this.onVisualRangeChanged();
      }
    }
  },
  methods: {
    onVisualRangeChanged() {
      const component = this.$refs.chart.instance;
      const items = component.getDataSource().items();
      if(!items.length ||
        items[0].date - this.visualRange.startValue >= HALFDAY ||
        this.visualRange.endValue - items[items.length - 1].date >= HALFDAY) {
        this.uploadDataByVisualRange(this.visualRange, component);
      }
    },
    uploadDataByVisualRange(visualRange, component) {
      const dataSource = component.getDataSource();
      const storage = dataSource.items();
      const ajaxArgs = {
        startVisible: this.getDateString(visualRange.startValue),
        endVisible: this.getDateString(visualRange.endValue),
        startBound: this.getDateString(storage.length ? storage[0].date : null),
        endBound: this.getDateString(storage.length ?
          storage[storage.length - 1].date : null)
      };

      if(ajaxArgs.startVisible !== ajaxArgs.startBound &&
        ajaxArgs.endVisible !== ajaxArgs.endBound && !packetsLock) {
        packetsLock++;
        component.showLoadingIndicator();

        this.getDataFrame(ajaxArgs)
          .then(dataFrame => {
            packetsLock--;
            dataFrame = dataFrame.map(i => {
              return {
                date: new Date(i.Date),
                minTemp: i.MinTemp,
                maxTemp: i.MaxTemp
              };
            });

            const componentStorage = dataSource.store();
            dataFrame.forEach(item => componentStorage.insert(item));
            dataSource.reload();

            this.onVisualRangeChanged();
          })
          .catch(() => {
            packetsLock--;
            dataSource.reload();
          });
      }
    },
    getDataFrame(args) {
      let params = '?';

      params += `startVisible=${args.startVisible}
        &endVisible=${args.endVisible}
        &startBound=${args.startBound}
        &endBound=${args.endBound}`;

      return fetch(`https://js.devexpress.com/Demos/WidgetsGallery/data/temperatureData${params}`)
        .then(response => response.json());
    },
    getDateString(dateTime) {
      return dateTime ? dateTime.toLocaleDateString('en-US') : '';
    }
  }
};
</script>
<style>
#chart {
    height: 440px;
}
</style>
