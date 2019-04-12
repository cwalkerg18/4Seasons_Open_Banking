<template>
  <div>
    <div class="left">
      <dx-list
        :data-source="dataSource"
        :grouped="true"
        :search-enabled="true"
        :selected-item-keys="[currentHotel.Id]"
        class="list"
        selection-mode="single"
        @selection-changed="listSelectionChanged"
      >
        <div
          slot="item"
          slot-scope="item"
        >
          <div>
            <div class="hotel">
              <div class="name">{{ item.Hotel_Name }}</div>
              <div class="address">{{ item.Postal_Code + ', ' + item.Address }}</div>
              <div
                :class="item.Hotel_Class.toLowerCase()"
                class="type"
              />
            </div>
            <div class="price-container">
              <div class="price">{{ item.Price | currency }}</div>
              <div class="caption">per<br>night</div>
            </div>
          </div>
        </div>
        <div
          slot="group"
          slot-scope="item"
        >
          <div class="city">{{ item.key }}</div>
        </div>
      </dx-list>
    </div>
    <div class="right">
      <div class="header">
        <div class="name-container">
          <div class="name">{{ currentHotel.Hotel_Name }}</div>
          <div
            :class="currentHotel.Hotel_Class.toLowerCase()"
            class="type"
          />
        </div>
        <div class="price-container">
          <div class="price">{{ currentHotel.Price | currency }}</div>
          <div class="caption">per<br>night</div>
        </div>
      </div>
      <dx-tile-view
        :data-source="currentHotel.Images"
        :height="224"
        :base-item-height="100"
        :base-item-width="137"
        :item-margin="12"
        class="tile"
        no-data-text=""
      >
        <div
          slot="item"
          slot-scope="item"
        >
          <div
            :style="{ 'background-image': 'url(../../../../images/hotels/' + item.FileName + ')' }"
            class="tile-image"
          />
        </div>
      </dx-tile-view>
      <div class="address">{{ currentHotel.Postal_Code }}, {{ currentHotel.Address }}</div>
      <div class="description">{{ currentHotel.Description }}</div>
    </div>
  </div>
</template>
<script>

import { DxTileView, DxList } from 'devextreme-vue';
import ArrayStore from 'devextreme/data/array_store';
import { data } from './data.js';

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
});

export default {
  components: {
    DxTileView, DxList
  },
  filters: {
    currency(data) {
      return currencyFormatter.format(data);
    }
  },
  data: function() {
    return {
      currentHotel: data[0],
      dataSource: {
        store: new ArrayStore({
          data: data,
          key: 'Id'
        }),
        group: 'City',
        searchExpr: ['Hotel_Name', 'City', 'Address']
      }
    };
  },
  methods: {
    listSelectionChanged(e) {
      this.currentHotel = e.addedItems[0];
    }
  }
};
</script>
<style src="./styles.css"></style>
