<template>
  <div id="data-grid-demo">
    <dx-data-grid
      id="gridContainer"
      :data-source="dataSource"
      :show-borders="true"
    >
      <dx-editing
        :allow-adding="true"
        :allow-deleting="true"
        :allow-updating="true"
        mode="cell"
      />
      <dx-paging :enabled="false"/>
      <dx-column
        :width="55"
        data-field="Prefix"
        caption="Title"
      />
      <dx-column
        data-field="FirstName"
      />
      <dx-column
        data-field="LastName"
      />
      <dx-column
        :width="170"
        data-field="Position"
      />
      <dx-column
        :lookup="lookup"
        :width="125"
        data-field="StateID"
        caption="State"
      />
      <dx-column
        data-field="BirthDate"
        data-type="date"
      />
    </dx-data-grid>
    <div class="options">
      <div class="caption">Options</div>
      <div class="option">
        <span>Session ID:</span>
        <dx-text-box
          id="sessionId"
          :value="sessionId"
          @value-changed="textBoxValueChanged"
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
  DxEditing
} from 'devextreme-vue/data-grid';
import { DxTextBox } from 'devextreme-vue';
import { HubConnectionBuilder, HttpTransportType } from '@aspnet/signalr';
import * as AspNetData from 'devextreme-aspnet-data-nojquery';

const BASE_PATH = 'https://js.devexpress.com/Demos/NetCore/';
const store = AspNetData.createStore({
    key: 'ID',
    loadUrl: `${BASE_PATH}api/DataGridCollaborativeEditing/`,
    insertUrl: `${BASE_PATH}api/DataGridCollaborativeEditing/`,
    updateUrl: `${BASE_PATH}api/DataGridCollaborativeEditing/`,
    deleteUrl: `${BASE_PATH}api/DataGridCollaborativeEditing/`,
    onBeforeSend: function(operation, ajaxSettings) {
      ajaxSettings.data.sessionId = getSessionId();
    }
  }),
  statesStore = AspNetData.createStore({
    key: 'ID',
    loadUrl: `${BASE_PATH}api/DataGridStatesLookup`
  });

export default {
  components: {
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxEditing,
    DxTextBox
  },
  data() {
    return {
      dataSource: store,
      lookup: {
        dataSource: statesStore,
        displayExpr: 'Name',
        valueExpr: 'ID'
      },
      sessionId: getSessionId()
    };
  },
  methods: {
    textBoxValueChanged: function(e) {
      setSessionId(e.value);
    }
  }
};

const connection = new HubConnectionBuilder()
  .withUrl(`${BASE_PATH}dataGridCollaborativeEditingHub`, {
    skipNegotiation: true,
    transport: HttpTransportType.WebSockets
  })
  .build();

connection.start()
  .then(function() {
    connection.on('update', function(key, data, sessionId) {
      sessionId === getSessionId() && store.push([{ type: 'update', key: key, data: data }]);
    });

    connection.on('insert', function(data, sessionId) {
      sessionId === getSessionId() && store.push([{ type: 'insert', data: data }]);
    });

    connection.on('remove', function(key, sessionId) {
      sessionId === getSessionId() && store.push([{ type: 'remove', key: key }]);
    });
  });

var SESSION_KEY = 'dx-demo-collaborative-editing-session-id';
var sessionId;
function getSessionId() {
  if (sessionId) {
    return sessionId;
  }
  var value = localStorage.getItem(SESSION_KEY) || generateRandomNumber();
  setSessionId(value);
  return value;
}
function setSessionId(value) {
  sessionId = value;
  localStorage.setItem(SESSION_KEY, value);
}
function generateRandomNumber() {
  var max = 1000000,
    min = 0;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
</script>

<style scoped>
#sessionId {
    width: 100px;
}

.options {
    padding: 20px;
    margin-top: 20px;
    background-color: rgba(191, 191, 191, 0.15);
}

.caption {
	font-weight: 500;
	font-size: 18px;
}

.option {
    margin-top: 10px;
}

.option > span {
    position: relative;
    top: 2px;
    margin-right: 10px;
}

.option > .dx-widget {
    width: 500px;
    display: inline-block;
    vertical-align: middle;
}
</style>
