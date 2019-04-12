<template>
  <div class="container">
    <div class="left-content">
      <dx-tree-view
        :data-source="continents"
        :select-by-click="true"
        selection-mode="single"
        @item-selection-changed="changeSelection"
      />
    </div>
    <div class="right-content">
      <div class="title-container">
        <img
          :src="countryData.flag"
          class="flag"
        >
        <div>
          <div class="country-name">{{ countryData.fullName }}</div>
          <div>{{ countryData.description }}</div>
        </div>
      </div>

      <div class="stats">
        <div>
          <div class="sub-title">Area, km<sup>2</sup></div>
          <div class="stat-value">{{ countryData.area }}</div>
        </div>
        <div>
          <div class="sub-title">Population</div>
          <div class="stat-value">{{ countryData.population }}</div>
        </div>
        <div>
          <div class="sub-title">GDP, billion</div>
          <div class="stat-value">{{ "$" + countryData.gdp }}</div>
        </div>
      </div>

      <div class="sub-title">Largest cities</div>
      <dx-tab-panel
        id="tabpanel"
        :selected-index.sync="tabPanelIndex"
        :data-source="citiesData"
        :animation-enabled="true"
        item-title-template="title"
        item-template="cityTemplate"
      >
        <div
          slot="title"
          slot-scope="item"
        >
          <span class="tab-panel-title">{{ item.text }}</span>
        </div>
        <div
          slot="cityTemplate"
          slot-scope="city"
        >
          <img
            :src="city.flag"
            class="flag"
          >
          <div class="right-content">
            <div><b>{{ (city.capital) ? "Capital. " : "" }}</b>{{ city.description }}</div>
            <div class="stats">
              <div>
                <div>Population</div>
                <div><b>{{ city.population }} people</b></div>
              </div>
              <div>
                <div>Area</div>
                <div><b>{{ city.area }} km<sup>2</sup></b></div>
              </div>
              <div>
                <div>Density</div>
                <div><b>{{ city.density }}/km<sup>2</sup></b></div>
              </div>
            </div>
          </div>
        </div>
      </dx-tab-panel>
    </div>
  </div>

</template>
<script>

import { DxTabPanel, DxTreeView } from 'devextreme-vue';
import { continents } from './data.js';
export default {
  components: {
    DxTabPanel,
    DxTreeView
  },
  data: function() {
    return {
      continents,
      tabPanelIndex: 0,
      countryData: continents[0].items[0],
      citiesData: continents[0].items[0].cities
    };
  },
  methods: {
    changeSelection(e) {
      var countryData = e.itemData;
      if(countryData.cities) {
        this.countryData = e.itemData;
        this.citiesData = countryData.cities;
        this.tabPanelIndex = 0;
      }
    }
  }
};
</script>
<style src="./styles.css"></style>
