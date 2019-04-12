var DemoApp = angular.module('DemoApp', ['dx']);

DemoApp.controller('DemoController', function DemoController($scope) {
    $scope.checkedItems = [];
    
    function isProduct(data) {
        return !data.items.length;
    }
    
    function processProduct(product) {
        var itemIndex = -1;
    
        $.each($scope.checkedItems, function (index, item) {
            if (item.key === product.key) {
                itemIndex = index;
                return false;
            }
        });
    
        if(product.selected && itemIndex === -1) {
            $scope.checkedItems.push(product);
        } else if (!product.selected){
            $scope.checkedItems.splice(itemIndex, 1);
        }
    }
    
    $scope.treeViewOptions = { 
        items: products,
        width: 320,
        showCheckBoxesMode: "normal",
        onItemSelectionChanged: function(e) {
            var item = e.node;
    
            if(isProduct(item)) {
                processProduct($.extend({
                    category: item.parent.text
                }, item));
            } else {
                $.each(item.items, function(index, product) {
                    processProduct($.extend({
                        category: item.text
                    }, product));
                });
            }
        }
    };
    
    $scope.listOptions = {
        width: 400,
        bindingOptions: {
            items: "checkedItems"
        }
    };
});