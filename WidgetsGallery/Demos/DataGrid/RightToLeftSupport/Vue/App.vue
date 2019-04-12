<template>
  <div>
    <dx-data-grid
      id="gridContainer"
      :data-source="dataSource"
      :rtl-enabled="rtlEnabled"
      :show-borders="true"
    >
      <dx-paging :page-size="15"/>
      <dx-search-panel
        :visible="true"
        :placeholder="placeholder"
      />
      <dx-column
        :data-field="rtlEnabled ? 'nameAr' : 'nameEn'"
        :caption="rtlEnabled ? 'الدولة' : 'Name'"
      />
      <dx-column
        :data-field="rtlEnabled ? 'capitalAr' : 'capitalEn'"
        :caption="rtlEnabled ? 'عاصمة' : 'Capital'"
      />
      <dx-column
        :caption="rtlEnabled ? 'عدد السكان (نسمة) 2013' : 'Population'"
        :format="{ type: 'fixedPoint', precision: 0 }"
        data-field="population"
      />
      <dx-column
        :header-cell-template="rtlEnabled ? 'arabicTemplate' : 'englishTemplate'"
        :format="{ type: 'fixedPoint', precision: 0 }"
        data-field="area"
      />
      <dx-column
        :visible="false"
        data-field="accession"
      />
      <div
        slot="englishTemplate"
        slot-scope="data"
      >
        <div>Area (km<sup>2</sup>)</div>
      </div>
      <div
        slot="arabicTemplate"
        slot-scope="data"
      >
        <div>المساحة (كم<sup>2</sup>)</div>
      </div>
    </dx-data-grid>
    <div class="options">
      <div class="caption">Options</div>
      <div class="option">
        <span>Language:</span>
        <dx-select-box
          id="select-language"
          :items="languages"
          :value="languages[1]"
          :width="250"
          @valueChanged="selectLanguage($event)"
        />
      </div>
    </div>
  </div>
</template>
<script>
import {
  DxDataGrid,
  DxColumn,
  DxPaging,
  DxSearchPanel
} from 'devextreme-vue/data-grid';
import DxSelectBox from 'devextreme-vue/select-box';

import service from './data.js';

export default {
  components: {
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxSearchPanel,
    DxSelectBox
  },
  data() {
    return {
      dataSource: service.getEuropeanUnion(),
      languages: ['Arabic (Right-to-Left direction)', 'English (Left-to-Right direction)'],
      placeholder: 'Search...',
      rtlEnabled: false
    };
  },
  methods: {
    selectLanguage(e) {
      this.rtlEnabled = e.value === this.languages[0];
      this.placeholder = this.rtlEnabled ? 'بحث' : 'Search...';
    }
  }
};
</script>
<style scoped>
#gridContainer {
    height: 440px;
}

#gridContainer sup {
    font-size: 0.8em;
    vertical-align: super;
    line-height: 0;
}

.options {
    padding: 20px;
    margin-top: 20px;
    background-color: rgba(191, 191, 191, 0.15);
}

.caption {
    font-size: 18px;
    font-weight: 500;
}

.option {
    margin-top: 10px;
}

.option > span {
    margin-right: 10px;
}

.option > .dx-widget {
    display: inline-block;
    vertical-align: middle;
}
</style>
