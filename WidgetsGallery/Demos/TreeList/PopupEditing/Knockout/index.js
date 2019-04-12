window.onload = function() {
    var viewModel = {
        treeListOptions: {
            dataSource: employees,
            keyExpr: "ID",
            parentIdExpr: "Head_ID",
            editing: {
                mode: "popup",
                allowUpdating: true,
                allowDeleting: true,
                allowAdding: true,
                popup: {
                    title: "Employee Info",
                    showTitle: true,
                    width: 700,
                    position: { my: "center", at: "bottom", of: "#employees" }
                }
            },
            columnAutoWidth: true,
            showRowLines: true,
            showBorders: true,
            columns: [{ 
                    dataField: "Full_Name",
                    validationRules: [{ type: "required" }]
                }, {
                    dataField: "Prefix",
                    caption: "Title",
                    validationRules: [{ type: "required" }]
                }, {
                    dataField: "Title",
                    caption: "Position",
                    validationRules: [{ type: "required" }]
                }, {
                    dataField: "City",
                    width: 150,
                    validationRules: [{ type: "required" }]
                }, {
                    dataField: "Hire_Date",
                    dataType: "date",
                    width: 120,
                    validationRules: [{ type: "required" }]
                }
            ],
            onCellPrepared: function(e) {
                if(e.column.command === "edit") {
                    e.cellElement.children(".dx-link-add").remove();
                }
            },
            expandedRowKeys: [1]
        }
    };
        
    ko.applyBindings(viewModel, document.getElementById("tree-list-demo"));
};