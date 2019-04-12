$(function(){
    var BASE_PATH = "https://js.devexpress.com/Demos/NetCore/";
    var store = DevExpress.data.AspNet.createStore({
        key: "ID",
        loadUrl: BASE_PATH + "api/DataGridCollaborativeEditing/",
        insertUrl: BASE_PATH + "api/DataGridCollaborativeEditing/",
        updateUrl: BASE_PATH + "api/DataGridCollaborativeEditing/",
        deleteUrl: BASE_PATH + "api/DataGridCollaborativeEditing/",
        onBeforeSend: function(operation, ajaxSettings) {
            ajaxSettings.data.sessionId = getSessionId();
        }
    });
    $("#gridContainer").dxDataGrid({
        dataSource: store,
        showBorders: true,
        repaintChangesOnly: true,
        paging: {
            enabled: false
        },
        editing: {
            refreshMode: "repaint",
            mode: "cell",
            allowUpdating: true,
            allowDeleting: true,
            allowAdding: true
        },
        columns: [
            {
                dataField: "Prefix",
                caption: "Title",
                width: 55
            },
            "FirstName",
            "LastName", {
                dataField: "Position",
                width: 170
            },{
                dataField: "StateID",
                caption: "State",
                width: 125,
                dataType: "number",
                validationRules: [
                    {
                        type: "required",
                        message: "The State field is required."
                    }
                ],
                lookup: {
                    dataSource: DevExpress.data.AspNet.createStore({
                        "key": "ID",
                        "loadUrl": BASE_PATH + "api/DataGridStatesLookup"
                    }),
                    displayExpr: "Name",
                    valueExpr: "ID"
                }
            }, {
                dataField: "BirthDate",
                dataType: "date"
            }
        ]
    });

    var connection = new signalR.HubConnectionBuilder()
        .withUrl(BASE_PATH + "dataGridCollaborativeEditingHub", {
            skipNegotiation: true,
            transport: signalR.HttpTransportType.WebSockets
        })
        .configureLogging(signalR.LogLevel.Information)
        .build();

    connection.start()
        .then(function () {
            connection.on("update", function (key, data, sessionId) {
                sessionId === getSessionId() && store.push([{ type: "update", key: key, data: data }]);
            });

            connection.on("insert", function (data, sessionId) {
                sessionId === getSessionId() && store.push([{ type: "insert", data: data }]);
            });

            connection.on("remove", function (key, sessionId) {
                sessionId === getSessionId() && store.push([{ type: "remove", key: key }]);
            });
        });

    $("#sessionId").dxTextBox({
        value: getSessionId(),
        onValueChanged: function(e) {
            setSessionId(e.value);
        }
    });
});
