<template>
  <div id="accordion">
    <dx-accordion
      :data-source="companies"
      :collapsible="collapsible"
      :multiple="multiple"
      :animation-duration="animationDuration"
      :selected-items.sync="selectedItems"
    >
      <div
        slot="title"
        slot-scope="data"
      >
        <custom-title :item-data="data"/>
      </div>
      <div
        slot="item"
        slot-scope="data"
      >
        <custom-item :item-data="data"/>
      </div>
    </dx-accordion>

    <div class="selected-data">
      <span class="caption">Selected Items</span>
      <dx-tag-box
        :data-source="companies"
        :value.sync="selectedItems"
        :disabled="!multiple"
        display-expr="CompanyName"
      />
    </div>

    <div class="options">
      <div class="caption">Options</div>
      <div class="option">
        <dx-check-box
          :value.sync="multiple"
          text="Multiple enabled"
        />
      </div>
      <div class="option">
        <dx-check-box
          :value.sync="collapsible"
          text="Collapsible enabled"
        />
      </div>
      <div class="option">
        <span>Animation duration</span>
        <dx-slider
          :min="0"
          :max="1000"
          :value.sync="animationDuration"
        >
          <dx-tooltip
            :enabled="true"
            position="bottom"
          />
          <dx-label :visible="true"/>
        </dx-slider>
      </div>
    </div>
  </div>
</template>
<script>
import { DxAccordion, DxTagBox, DxCheckBox } from 'devextreme-vue';
import DxSlider, { DxTooltip, DxLabel } from 'devextreme-vue/slider';
import CustomTitle from './CustomTitle.vue';
import CustomItem from './CustomItem.vue';

import service from './data.js';

export default {
  components: {
    DxAccordion, DxTagBox, DxCheckBox, DxSlider, DxTooltip, DxLabel, CustomTitle, CustomItem
  },
  data() {
    const companies = service.getCompanies();
    return {
      companies,
      selectedItems: [companies[0]],
      multiple: false,
      collapsible: false,
      animationDuration: 300
    };
  }
};
</script>
<style scoped>
#accordion h1 {
  font-size: 20px;
}

#accordion h1,
#accordion p {
  margin: 0;
}

.dx-theme-material #accordion .dx-accordion-item-opened h1 {
  margin-top: 7px;
}

.options,
.selected-data {
  padding: 20px;
  background-color: rgba(191, 191, 191, 0.15);
  margin-top: 20px;
}

.selected-data {
  position: relative;
  height: 36px;
}

.selected-data > .caption {
  position: relative;
  top: 5px;
  margin-right: 10px;
  font-weight: bold;
  font-size: 115%;
}

.selected-data > .dx-widget {
  position: absolute;
  left: 140px;
  right: 20px;
  top: 20px;
}

.options > .caption {
  font-weight: 500;
  font-size: 18px;
}

.option {
  margin-top: 10px;
}
</style>
