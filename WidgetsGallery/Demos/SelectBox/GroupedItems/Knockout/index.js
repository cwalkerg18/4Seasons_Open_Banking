window.onload = function() {
    var products = new DevExpress.data.DataSource({
        store: productsData,
        key: "id",
        group: "Category"
    });
    
    var viewModel = {
        selectBoxOptions: {
            dataSource: products,
            valueExpr: "ID",
            value: productsData[16].ID,
            grouped: true,
            displayExpr: "Name"
        },
        
        searchSelectBoxOptions: {
            dataSource: products,
            valueExpr: "ID",
            value: productsData[17].ID,
            searchEnabled: true,
            grouped: true,
            displayExpr: "Name"
        },
        
        templateSelectBoxOptions: {
            dataSource: products,
            valueExpr: "ID",
            value: productsData[18].ID,
            grouped: true,
            groupTemplate: "group",
            displayExpr: "Name"
        }
    };
    
    ko.applyBindings(viewModel, document.getElementById("select-box-demo"));
};