var DemoApp = angular.module('DemoApp', ['dx']);

DemoApp.controller('DemoController', function DemoController($scope) {
    
    var treeView;
    
    var syncTreeViewSelection = function(treeView){
        if (!treeView) return;
        
        if (!$scope.treeBoxValue) {
            treeView.unselectAll();
        } else {
            treeView.selectItem($scope.treeBoxValue);
        }
    };
    
    var makeAsyncDataSource = function(jsonFile){
        return new DevExpress.data.CustomStore({
            loadMode: "raw",
            key: "ID",
            load: function() {
                return $.getJSON("../../../../data/" + jsonFile);
            }
        });
    };

    var getSelectedItemsKeys = function(items) {
        var result = [];
        items.forEach(function(item) {
            if(item.selected) {
                result.push(item.key);
            }
            if(item.items.length) {
                result = result.concat(getSelectedItemsKeys(item.items));
            }
        });
        return result;
    };

    var treeDataSource = makeAsyncDataSource("treeProducts.json"),
        gridDataSource = makeAsyncDataSource("customers.json");
    
    $scope.treeBoxValue = "1_1";
    
    $scope.treeBoxOptions = {
        bindingOptions: {
            value: 'treeBoxValue'
        },
        valueExpr: "ID",
        displayExpr: "name",
        placeholder: "Select a value...",
        showClearButton: true,
        dataSource: treeDataSource,
        onValueChanged: function(){
            syncTreeViewSelection(treeView);
        },
        treeView: {
            dataSource: treeDataSource,
            dataStructure: "plain",
            keyExpr: "ID",
            parentIdExpr: "categoryId",
            displayExpr: "name",
            selectByClick: true,
            selectNodesRecursive: false,
            selectionMode: "single",
            onContentReady: function(e) {
                treeView = e.component;
                
                syncTreeViewSelection(treeView);
            },
            onItemSelectionChanged: function(args){
                var nodes = args.component.getNodes();

                $scope.treeBoxValue = getSelectedItemsKeys(nodes);
            }
        }
    };
    
    $scope.gridBoxValue = 3;
    $scope.gridSelectedRowKeys = [$scope.gridBoxValue];
    
    $scope.gridBoxOptions = {
        bindingOptions: {
            value: "gridBoxValue"
        },
        valueExpr: "ID",
        deferRendering: false,
        placeholder: "Select a value...",
        displayExpr: function(item){
            return item && item.CompanyName + " <" + item.Phone + ">";
        },
        onValueChanged: function(e){
            $scope.gridSelectedRowKeys = e.value || [];
        },
        showClearButton: true,
        dataSource: gridDataSource,
        dataGrid: {
            dataSource: gridDataSource,
            columns: ["CompanyName", "City", "Phone"],
            hoverStateEnabled: true,
            paging: { enabled: true, pageSize: 10 },
            filterRow: { visible: true },
            scrolling: { mode: "infinite" },
            selection: { mode: "single" },
            height: "100%",
            bindingOptions: {
                "selectedRowKeys": "gridSelectedRowKeys"
            },
            onSelectionChanged: function(selectedItems){
                var keys = selectedItems.selectedRowKeys;
                $scope.gridBoxValue = keys.length && keys[0] || null;
            }
        }
    };
});
