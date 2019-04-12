window.onload = function() {
    var currentProduct = ko.observable(simpleProducts[0]),
        currentProducts = ko.observableArray(simpleProducts);
    
    var viewModel = {
        currentProduct: currentProduct,
        searchOptions: {
            items: products,
            displayExpr: "Name",
            valueExpr: "ID",
            searchEnabled: true
        },
        fieldEditingOptions: {
            items: currentProducts,
            value: currentProduct,
            acceptCustomValue: true,
            onCustomItemCreating: function(data) {
                var item = data.text;
                var isNewItem = currentProducts.indexOf(item) === -1;
    
                data.customItem = item || "";
    
                if(item && isNewItem) {
                    currentProducts.push(item);
                }
            }
        },

    };
    
    ko.applyBindings(viewModel, document.getElementById("select-box-demo"));
};