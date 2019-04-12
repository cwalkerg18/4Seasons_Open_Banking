import React from 'react';

import DxPieChart from 'devextreme/viz/pie_chart';
import Map, {
  Export,
  Label,
  Layer,
  Legend,
  Source,
  Subtitle,
  Title,
  Tooltip
} from 'devextreme-react/vector-map';

import * as mapsData from 'devextreme/dist/js/vectormap-data/world.js';
import { countriesGDP } from './data.js';

const colorGroups = [0, 10000, 50000, 100000, 500000, 1000000, 10000000, 50000000];
function customizeLayer(elements) {
  elements.forEach((element) => {
    const countryGDPData = countriesGDP[element.attribute('name')];
    element.attribute('total', countryGDPData && countryGDPData.total || 0);
  });
}

const format = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 0
}).format;

function customizeLegendText(arg) {
  return `${format(arg.start)} to ${format(arg.end)}`;
}

function customizeTooltip(arg) {
  const countryGDPData = countriesGDP[arg.attribute('name')];
  const total = countryGDPData && countryGDPData.total;
  const totalMarkupString = total ? `<div id="nominal" >Nominal GDP: $${ total }M</div>` : '';
  const node = `<div #gdp><h4>${ arg.attribute('name') }</h4>${
    totalMarkupString
  }<div id="gdp-sectors"></div></div>`;
  return {
    html: node
  };
}

function onTooltipShown(e) {
  const name = e.target.attribute('name');
  const gdpData = countriesGDP[name] ? [
    { name: 'industry', value: countriesGDP[name].industry },
    { name: 'services', value: countriesGDP[name].services },
    { name: 'agriculture', value: countriesGDP[name].agriculture }
  ] : null;
  const container = document.getElementById('gdp-sectors');
  if (gdpData) {
    new DxPieChart(container, getPieChartConfig(gdpData));
  } else {
    container.textContent = 'No economic development data';
  }
}

function getPieChartConfig(chartData) {
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

const App = function() {
  return (
    <Map elementAttr={{ id: 'vector-map' }} bounds={[-180, 85, 180, -60]} onTooltipShown={onTooltipShown}>
      <Layer
        name={'areas'}
        dataSource={mapsData.world}
        colorGroups={colorGroups}
        colorGroupingField={'total'}
        customize={customizeLayer}
      >
        <Label dataField={'name'} enabled={true} />
      </Layer>

      <Legend customizeText={customizeLegendText}>
        <Source layer={'areas'} grouping={'color'} />
      </Legend>

      <Title text={'Nominal GDP'}>
        <Subtitle text={'(in millions of US dollars)'} />
      </Title>

      <Tooltip enabled={true} customizeTooltip={customizeTooltip} />

      <Export enabled={true} />
    </Map>
  );
};
export default App;
