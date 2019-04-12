window.onload = function() {
    var viewModel = {
        lookupOptions: {
            items: employeesList,
            value: employeesList[0],
            showPopupTitle: false
        },
    
        lookupGroupedOptions: {
            dataSource: new DevExpress.data.DataSource({ 
                store: employeesTasks, 
                key: "ID", 
                group: "Assigned"
            }),
            grouped: true,
            closeOnOutsideClick: true,
            showPopupTitle: false,
            displayExpr: "Subject"
        }
    };
    
    ko.applyBindings(viewModel, document.getElementById("demo"));
};