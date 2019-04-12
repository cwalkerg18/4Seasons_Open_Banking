var DemoApp = angular.module('DemoApp', ['dx']);

DemoApp.controller('DemoController', function DemoController($scope) {
    $scope.dataGridOptions = {
        dataSource: employees,
        columnAutoWidth: true,
        keyExpr: "ID",
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
    };
    
});