var DemoApp = angular.module('DemoApp', ['dx']);

var products = new DevExpress.data.DataSource({
    store: productsData,
    key: "id",
    group: "Category"
});

DemoApp.controller('DemoController', function DemoController($scope) {
    $scope.selectBoxOptions = {
        dataSource: products,
        valueExpr: "ID",
        value: productsData[16].ID,
        grouped: true,
        displayExpr: "Name"
    };
        
    $scope.searchSelectBoxOptions = {
        dataSource: products,
        valueExpr: "ID",
        value: productsData[17].ID,
        searchEnabled: true,
        grouped: true,
        displayExpr: "Name"
    };
    
    $scope.templateSelectBoxOptions = {
        dataSource: products,
        valueExpr: "ID",
        value: productsData[18].ID,
        grouped: true,
        groupTemplate: "group",
        displayExpr: "Name"
    };
});