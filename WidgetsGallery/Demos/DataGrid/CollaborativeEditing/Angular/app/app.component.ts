import { NgModule, Component, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DxDataGridModule,
         DxTextBoxModule } from 'devextreme-angular';
import { HubConnectionBuilder, HttpTransportType } from '@aspnet/signalr';
import * as AspNetData from 'devextreme-aspnet-data-nojquery';

const BASE_PATH = 'https://js.devexpress.com/Demos/NetCore/';

if(!/localhost/.test(document.location.host)) {
    enableProdMode();
}

@Component({
    selector: 'demo-app',
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css'],
    preserveWhitespaces: true
})
export class AppComponent {
    dataSource: any;
    stateDataSource: any;
    sessionId: any;

    constructor() {
        var store = AspNetData.createStore({
            key: 'ID',
            loadUrl: BASE_PATH + 'api/DataGridCollaborativeEditing/',
            insertUrl: BASE_PATH + 'api/DataGridCollaborativeEditing/',
            updateUrl: BASE_PATH + 'api/DataGridCollaborativeEditing/',
            deleteUrl: BASE_PATH + 'api/DataGridCollaborativeEditing/',
            onBeforeSend: function(operation, ajaxSettings) {
                ajaxSettings.data.sessionId = getSessionId();
            }
        });
        this.sessionId = getSessionId();
        this.dataSource = store;
        this.stateDataSource = AspNetData.createStore({
            key: 'ID',
            loadUrl: BASE_PATH + 'api/DataGridStatesLookup'
        });

        var connection = new HubConnectionBuilder()
            .withUrl(BASE_PATH + 'dataGridCollaborativeEditingHub', {
                skipNegotiation: true,
                transport: HttpTransportType.WebSockets
            })
            .build();

        connection.start()
            .then(function () {
                connection.on('update', function (key, data, sessionId) {
                    sessionId === getSessionId() && store.push([{ type: 'update', key: key, data: data }]);
                });

                connection.on('insert', function (data, sessionId) {
                    sessionId === getSessionId() && store.push([{ type: 'insert', data: data }]);
                });

                connection.on('remove', function (key, sessionId) {
                    sessionId === getSessionId() && store.push([{ type: 'remove', key: key }]);
                });
            });
    }

    textBoxValueChanged(e) {
        setSessionId(e.value);
    }
}

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

@NgModule({
    imports: [
        BrowserModule,
        DxDataGridModule,
        DxTextBoxModule
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
