<template>
  <dx-data-grid
    id="grid"
    :data-source="countries"
    :column-auto-width="true"
    :allow-column-reordering="true"
    :show-borders="true"
  >
    <dx-column data-field="Country"/>
    <dx-column
      data-field="Area"
      header-cell-template="headerTemplate"
    />
    <dx-column caption="Population">
      <dx-column
        caption="Total"
        data-field="Population_Total"
        format="fixedPoint"
      />
      <dx-column
        caption="Urban"
        data-field="Population_Urban"
        format="percent"
      />
    </dx-column>
    <dx-column caption="Nominal GDP">
      <dx-column
        caption="Total, mln $"
        data-field="GDP_Total"
        format="fixedPoint"
        sort-order="desc"
      />
      <dx-column caption="By Sector">
        <dx-column
          :width="95"
          :format="gdpFormat"
          caption="Agriculture"
          data-field="GDP_Agriculture"
        />
        <dx-column
          :width="80"
          :format="gdpFormat"
          caption="Industry"
          data-field="GDP_Industry"
        />
        <dx-column
          :width="85"
          :format="gdpFormat"
          caption="Services"
          data-field="GDP_Services"
        />
      </dx-column>
    </dx-column>
    <div
      slot="headerTemplate"
      slot-scope="data"
    >
      <div>Area, km<sup>2</sup></div>
    </div>
  </dx-data-grid>
</template>

<script>

import DxDataGrid, { DxColumn } from 'devextreme-vue/data-grid';
import { countries } from './data.js';

export default {
  components: {
    DxDataGrid,
    DxColumn
  },
  data() {
    return {
      countries: countries,
      gdpFormat: {
        type: 'percent',
        precision: 1
      }
    };
  }
};
</script>

<style>
#grid sup {
    font-size: 0.8em;
    vertical-align: super;
    line-height: 0;
}

.long-title h3 {
    font-family: 'Segoe UI Light', 'Helvetica Neue Light', 'Segoe UI', 'Helvetica Neue', 'Trebuchet MS', Verdana;
    font-weight: 200;
    font-size: 28px;
    text-align: center;
    margin-bottom: 20px;
}
</style>
