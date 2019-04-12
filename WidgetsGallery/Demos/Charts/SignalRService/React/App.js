import React from 'react';
import Chart, {
  ArgumentAxis,
  ValueAxis,
  Aggregation,
  Legend,
  Series,
  ScrollBar,
  ZoomAndPan,
  LoadingIndicator
} from 'devextreme-react/chart';
import CustomStore from 'devextreme/data/custom_store';
import { HubConnectionBuilder } from '@aspnet/signalr';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { connectionStarted: false };

    const hubConnection = new HubConnectionBuilder()
      .withUrl('https://js.devexpress.com/Demos/NetCore/stockTickDataHub')
      .build();

    const store = new CustomStore({
      load: () => hubConnection.invoke('getAllData'),
      key: 'date'
    });

    hubConnection
      .start()
      .then(() => {
        this.dataSource = store;
        hubConnection.on('updateStockPrice', (data) => {
          store.push([{ type: 'insert', key: data.date, data: data }]);
        });
        this.setState({ connectionStarted: true });
      });
  }

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
  }

  zoomEnd(e) {
    if (e.range.endValue - e.range.startValue < 1000 * 60 * 10) {
      e.cancel = true;
    }
  }

  render() {
    return (
      <div>
        <Chart
          id={'chart'}
          dataSource={this.dataSource}
          margin={{ right: 30 }}
          onZoomEnd={this.zoomEnd}
          title={'Stock Price'}>
          <Series
            argumentField={'date'}
            type={'CandleStick'}>
            <Aggregation
              enabled={true}
              method={'custom'}
              calculate={this.calculateCandle} />
          </Series>
          <Legend visible={false} />
          <ArgumentAxis
            argumentType={'datetime'}
            valueMarginsEnabled={false}
            defaultVisualRange={{ length: 'hour' }} />
          <ValueAxis placeholderSize={50} />
          <ZoomAndPan argumentAxis={'both'} />
          <ScrollBar visible={true} />
          <LoadingIndicator show={!this.state.connectionStarted} />
        </Chart>
      </div>
    );
  }
}

export default App;
