var DemoApp = angular.module('DemoApp', ['dx']),
    url = "https://js.devexpress.com/Demos/Mvc/api/TreeListTasks";

DemoApp.controller('DemoController', function DemoController($scope) {
    $scope.treeList;
    $scope.focusedRowKeyEditor;
    $scope.taskSubject = "";
    $scope.taskAssigned = "";
    $scope.startDate = "";
    $scope.taskStatus = "";
    $scope.taskProgress = "";

    $scope.treeListOptions = {
        dataSource: DevExpress.data.AspNet.createStore({
            key: "Task_ID",
            loadUrl: url + "/Tasks",
            onBeforeSend: function(_, ajaxOptions) {
                ajaxOptions.xhrFields = { withCredentials: true };
            }
        }),
        remoteOperations: {
            filtering: true,
            sorting: true,
            grouping: true
        },
        parentIdExpr: "Task_Parent_ID",
        hasItemsExpr: "Has_Items",
        focusedRowEnabled: true,
        focusedRowKey: 4,
        showBorders: true,
        wordWrapEnabled: true,
        columns: [
            {
                dataField: "Task_ID",
                width: 100,
                alignment: "left"
            },
            {
                dataField: "Task_Assigned_Employee_ID",
                caption: "Assigned",
                minWidth: 120,
                lookup: {
                    dataSource: DevExpress.data.AspNet.createStore({
                        key: "ID",
                        loadUrl: url + "/TaskEmployees"
                    }),
                    valueExpr: "ID",
                    displayExpr: "Name"
                }
            },
            {
                dataField: "Task_Status",
                caption: "Status",
                width: 160
            },
            {
                dataField: "Task_Start_Date",
                caption: "Start Date",
                dataType: "date",
                width: 160
            },
            {
                dataField: "Task_Due_Date",
                caption: "Due Date",
                dataType: "date",
                width: 160
            }
        ],
        onInitialized: function(e) {
            $scope.treeList = e.component;
        },
        onFocusedRowChanged: function(e) {
            var rowData = e.row.data,
                assignedToData = $scope.treeList.columnOption("Assigned").lookup.items[e.rowIndex];

            $scope.taskSubject = rowData.Task_Subject;
            $scope.taskAssigned = assignedToData.Name;
            $scope.startDate = new Date(rowData.Task_Start_Date).toLocaleDateString();

            $scope.taskStatus = rowData.Task_Status;
            $scope.taskProgress = rowData.Task_Completion ? rowData.Task_Completion + "%" : "";

            $scope.focusedRowKeyEditor.option("value", e.component.option("focusedRowKey"));
        }
    };

    $scope.focusedRowKeyOptions = {
        min: 1,
        max: 182,
        step: 0,
        onInitialized: function(e) {
            $scope.focusedRowKeyEditor = e.component;
        },
        onValueChanged: function(e) {
            if(e.event && e.value > 0) {
                $scope.treeList.option("focusedRowKey", e.value);
            }
        }
    };
});