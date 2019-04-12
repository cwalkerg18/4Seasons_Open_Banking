var DemoApp = angular.module('DemoApp', ['dx']);

DemoApp.controller('DemoController', function DemoController($scope) {
    $scope.currentProduct = simpleProducts[0];
    $scope.currentProducts = simpleProducts;

    $scope.selectBox = {
        searchOptions: {
            items: products,
            displayExpr: "Name",
            valueExpr: "ID",
            searchEnabled: true
        },
        fieldEditingOptions: {
            acceptCustomValue: true,
            bindingOptions: {
                value: "currentProduct",
                items: "currentProducts"
            },
            onCustomItemCreating: function(data) {
                var item = data.text;
                var isNewItem = $scope.currentProducts.indexOf(item) === -1;
    
                data.customItem = item || "";
    
                if(item && isNewItem) {
                    $scope.currentProducts.push(item);
                }
            }
        }
    };
});