window.onload = function() {
    var viewModel = {
        treeListOptions: { 
            dataSource: {
                load: function(options) {
                    return $.ajax({
                        url: "http://jsserver.corp.devexpress.com:81/Demos-18.2/Mvc/api/treeListData",
                        dataType: "json",
                        data: { parentIds: options.parentIds.join(",") }
                    });
                }
            },
            remoteOperations: {
                filtering: true
            },
            keyExpr: "id",
            parentIdExpr: "parentId",
            hasItemsExpr: "hasItems",
            rootValue: "",
            showBorders: true,
            columns: [
                { dataField: "name" },
                { dataField: "size", width: 100, 
                    customizeText: function(e) {
                        if(e.value !== null) {
                            return Math.ceil(e.value / 1024) + " KB";
                        }
                    }
                },
                { dataField: "createdDate", dataType: "date", width: 150 },
                { dataField: "modifiedDate", dataType: "date", width: 150 }
            ]
        }
    };
    
    ko.applyBindings(viewModel, document.getElementById("treelist"));
};