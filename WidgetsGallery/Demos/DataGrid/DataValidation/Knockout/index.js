window.onload = function() {
    var viewModel = {
        dataGridOptions: {
            dataSource: employees,
            keyExpr: "ID",
            columnAutoWidth: true,
            showBorders: true,
            paging: {
                enabled: false
            },
            editing: {
                mode: "batch",
                allowUpdating: true,
                allowAdding: true
            },
            columns: [{
                    dataField: "FirstName",
                    validationRules: [{ type: "required" }]
                }, {
                    dataField: "LastName",
                    validationRules: [{ type: "required" }]
                }, {
                    dataField: "Position",
                    validationRules: [{ type: "required" }]
                }, {
                    dataField: "Phone",
                    validationRules: [{ type: "required" }, {
                        type: "pattern",
                        message: 'Your phone must have "(555) 555-5555" format!',
                        pattern: /^\(\d{3}\) \d{3}-\d{4}$/i 
                    }]
                }, {
                    dataField: "Email",
                    validationRules: [{ type: "required" }, { type: "email" }]
                }
            ]
        }
    };
    
    ko.applyBindings(viewModel, document.getElementById("data-grid-demo"));
};