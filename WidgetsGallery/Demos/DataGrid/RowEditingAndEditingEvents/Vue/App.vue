<template>
  <div>
    <dx-data-grid
      id="gridContainer"
      :data-source="dataSource"
      :allow-column-reordering="true"
      :show-borders="true"
      key-expr="ID"
      @editing-start="logEvent('EditingStart')"
      @init-new-row="logEvent('InitNewRow')"
      @row-inserting="logEvent('RowInserting')"
      @row-inserted="logEvent('RowInserted')"
      @row-updating="logEvent('RowUpdating')"
      @row-updated="logEvent('RowUpdated')"
      @row-removing="logEvent('RowRemoving')"
      @row-removed="logEvent('RowRemoved')"
    >

      <dx-paging :enabled="true"/>
      <dx-editing
        :allow-updating="true"
        :allow-deleting="true"
        :allow-adding="true"
        mode="row"
      />

      <dx-column
        data-field="Prefix"
        caption="Title"
      />
      <dx-column data-field="FirstName"/>
      <dx-column data-field="LastName"/>
      <dx-column
        :width="130"
        data-field="Position"
      />
      <dx-column
        :width="125"
        data-field="StateID"
        caption="State"
      >
        <dx-lookup
          :data-source="states"
          display-expr="Name"
          value-expr="ID"
        />
      </dx-column>
      <dx-column
        :width="125"
        data-field="BirthDate"
        data-type="date"
      />
    </dx-data-grid>

    <div id="events">
      <div>
        <div class="caption">
          Fired events
        </div>
        <dx-button
          id="clear"
          text="Clear"
          @click="clearEvents()"
        />
      </div>
      <ul>
        <li
          v-for="(event, index) in events"
          :key="index"
        >{{ event }}</li>
      </ul>
    </div>
  </div>
</template>
<script>
import DxButton from 'devextreme-vue/button';
import { DxDataGrid, DxColumn, DxEditing, DxPaging, DxLookup } from 'devextreme-vue/data-grid';
import { employees, states } from './data.js';

export default {
  components: {
    DxDataGrid,
    DxColumn,
    DxEditing,
    DxPaging,
    DxButton,
    DxLookup
  },
  data() {
    return {
      events:[],
      dataSource: employees,
      states: states
    };
  },
  methods: {
    logEvent(eventName) {
      this.events.unshift(eventName);
    },
    clearEvents() {
      this.events = [];
    }
  },
};
</script>
<style>
#events {
    background-color: rgba(191, 191, 191, 0.15);
    padding: 20px;
    margin-top: 20px;
}

#events > div {
    padding-bottom: 5px;
}

#events > div:after {
    content: "";
    display: table;
    clear: both;
}

#events #clear {
    float: right;
}

#events .caption {
    float: left;
    font-weight: bold;
    font-size: 115%;
    line-height: 115%;
    padding-top: 7px;
}

#events ul {
    list-style: none;
    max-height: 100px;
    overflow: auto;
    margin: 0;
}

#events ul li {
    padding: 7px 0;
    border-bottom: 1px solid #dddddd;
}

#events ul li:last-child {
    border-bottom: none;
}
</style>
