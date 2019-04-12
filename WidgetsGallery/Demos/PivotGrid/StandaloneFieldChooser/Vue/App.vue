<template>
  <div>
    <dx-pivot-grid
      :allow-sorting-by-summary="true"
      :allow-sorting="true"
      :allow-filtering="true"
      :show-borders="true"
      :data-source="dataSource"
    >
      <dx-field-chooser :enabled="false"/>
    </dx-pivot-grid>

    <div class="container">
      <dx-pivot-grid-field-chooser
        :data-source="dataSource"
        :width="400"
        :height="400"
        :layout.sync="layout"
        :apply-changes-mode.sync="applyChangesMode"
        :state.sync="state"
      >
        <dx-texts
          all-fields="All"
          column-fields="Columns"
          data-fields="Data"
          row-fields="Rows"
          filter-fields="Filter"
        />
      </dx-pivot-grid-field-chooser>
      <div
        v-if="applyChangesMode === 'onDemand'"
        class="bottom-bar"
      >
        <dx-button
          text="Apply"
          type="default"
          @onClick="applyClick()"
        />
        <dx-button
          text="Cancel"
          @onClick="cancelClick()"
        />
      </div>

      <div class="options">
        <div class="caption">Options</div>
        <div class="option">
          <span>Choose layout:</span>
          <dx-radio-group
            :items="layouts"
            :value.sync="layout"
            class="option-editor"
            layout="vertical"
            value-expr="key"
            display-expr="name"
          />
        </div>
        <div class="option">
          <span>Apply Changes Mode:</span>
          <dx-select-box
            :items="applyChangesModes"
            :width="180"
            :value.sync="applyChangesMode"
            class="option-editor"
          />
        </div>
      </div>

    </div>
  </div>
</template>
<script>

import {
  DxPivotGrid,
  DxFieldChooser
} from 'devextreme-vue/pivot-grid';

import {
  DxPivotGridFieldChooser,
  DxTexts
} from 'devextreme-vue/pivot-grid-field-chooser';

import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';

import {
  DxSelectBox
} from 'devextreme-vue/select-box';

import {
  DxButton
} from 'devextreme-vue/button';

import {
  DxRadioGroup
} from 'devextreme-vue/radio-group';

import service from './data.js';

export default {
  components: {
    DxPivotGrid,
    DxFieldChooser,
    DxSelectBox,
    DxButton,
    DxRadioGroup,
    DxPivotGridFieldChooser,
    DxTexts
  },
  data() {
    let dataSource = new PivotGridDataSource({
      fields: [{
        caption: 'Region',
        width: 120,
        dataField: 'region',
        area: 'row',
        headerFilter: {
          allowSearch: true
        }
      }, {
        caption: 'City',
        dataField: 'city',
        width: 150,
        area: 'row',
        headerFilter: {
          allowSearch: true
        },
        selector: function(data) {
          return `${data.city } (${ data.country })`;
        }
      }, {
        dataField: 'date',
        dataType: 'date',
        area: 'column'
      }, {
        caption: 'Sales',
        dataField: 'amount',
        dataType: 'number',
        summaryType: 'sum',
        format: 'currency',
        area: 'data'
      }],
      store: service.getSales()
    });
    return {
      dataSource: dataSource,
      state: dataSource.state(),
      layouts: service.getLayouts(),
      layout: 0,
      applyChangesModes: ['instantly', 'onDemand'],
      applyChangesMode: 'instantly'
    };
  },
  methods: {
    applyClick() {
      this.dataSource.state(this.state);
    },
    cancelClick() {
      this.state = this.dataSource.state();
    }
  }
};
</script>
<style>
.container {
    position: relative;
    margin-top: 20px;
}
.options {
    padding: 20px;
    background-color: rgba(191, 191, 191, 0.15);
    position: absolute;
    top: 29px;
    bottom: 5px;
    left: 420px;
    width: 180px;
}
.caption {
    font-size: 18px;
    font-weight: 500;
}
.option {
    margin-top: 10px;
}

.bottom-bar {
    width: 396px;
    text-align: right;
    margin-top: 5px;
}

#applyButton {
    margin-right: 10px;
}

.option-editor {
    margin-top: 5px;
}
</style>
