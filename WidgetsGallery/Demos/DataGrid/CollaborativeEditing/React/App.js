import React from 'react';

import DataGrid, {
  Column,
  Editing,
  Paging
} from 'devextreme-react/data-grid';
import { TextBox } from 'devextreme-react';
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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionId: getSessionId()
    };
    this.textBoxValueChanged = this.textBoxValueChanged.bind(this);
  }
  textBoxValueChanged(e) {
    setSessionId(e.value);
    this.setState({
      sessionId: getSessionId()
    });
  }
  render() {
    return (
      <div id={'data-grid-demo'}>
        <DataGrid id={'gridContainer'}
          dataSource={store}
          showBorders={true}
          repaintChangesOnly={true}
        >
          <Paging enabled={false} />
          <Editing
            refreshMode={'repaint'}
            mode={'cell'}
            allowUpdating={true}
            allowDeleting={true}
            allowAdding={true} />

          <Column dataField={'Prefix'} caption={'Title'} width={55} />
          <Column dataField={'FirstName'} />
          <Column dataField={'LastName'} />
          <Column dataField={'Position'} width={170} />
          <Column dataField={'StateID'} caption={'State'} width={125}
            lookup={{
              dataSource: statesStore,
              displayExpr: 'Name',
              valueExpr: 'ID'
            }} />
          <Column dataField={'BirthDate'} dataType={'date'} />
        </DataGrid>
        <div className={'options'}>
          <div className={'caption'}>Options</div>
          <div className={'option'}>
            <span>Session ID: </span>
            <TextBox
              id={'sessionId'}
              value={this.state.sessionId}
              onValueChanged={this.textBoxValueChanged} />
          </div>
        </div>
      </div>
    );
  }
}

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

export default App;
